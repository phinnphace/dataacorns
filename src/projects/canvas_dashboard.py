#!/usr/bin/env python3
"""
Canvas API Dashboard
--------------------
Pulls assignments, due dates, submissions, and calendar events for your
Canvas courses and generates a clean daily summary.

Usage
-----
1. Copy .env.example to .env and fill in your values.
2. Install dependencies:  pip install -r requirements.txt
3. Run:                   python canvas_dashboard.py

Output
------
- canvas_summary.md  – Human-readable daily summary
- canvas_data.db     – SQLite database for custom queries

Automation
----------
See README.md for cron / launchd / Task Scheduler setup instructions.
"""

import os
import json
import sqlite3
from datetime import datetime, timezone
from typing import List, Dict, Any
import requests
from dotenv import load_dotenv

load_dotenv()

# ============================================================================
# CONFIGURATION
# ============================================================================

# Get your token at: Canvas → Account → Settings → New Access Token
CANVAS_TOKEN = os.getenv("CANVAS_TOKEN")
if not CANVAS_TOKEN:
    raise SystemExit(
        "\n❌  CANVAS_TOKEN is not set.\n"
        "    1. Copy .env.example to .env\n"
        "    2. Add your Canvas API token (Canvas → Account → Settings → New Access Token)\n"
        "    3. Re-run the script.\n"
    )

# Your Canvas instance URL (e.g. https://canvas.instructure.com or your school's URL)
CANVAS_BASE_URL = os.getenv("CANVAS_BASE_URL", "https://canvas.instructure.com")

# Comma-separated course IDs to track, or leave blank to track ALL active courses.
# Find a course ID in the URL when you open it in Canvas: /courses/XXXXXX
_course_ids_env = os.getenv("KEEP_COURSE_IDS", "")
KEEP_COURSE_IDS = (
    {int(cid.strip()) for cid in _course_ids_env.split(",") if cid.strip()}
    if _course_ids_env.strip()
    else set()
)

# Output files — stored in the same directory as this script by default.
# Override by setting OUTPUT_DIR in .env
_script_dir = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.getenv("OUTPUT_DIR", _script_dir)
DB_FILE = os.path.join(OUTPUT_DIR, "canvas_data.db")
SUMMARY_FILE = os.path.join(OUTPUT_DIR, "canvas_summary.md")


# ============================================================================
# CANVAS API HELPERS
# ============================================================================

def canvas_get(endpoint: str, params: dict = None) -> List[Dict[str, Any]]:
    """GET request to Canvas API with automatic pagination."""
    headers = {"Authorization": f"Bearer {CANVAS_TOKEN}"}
    url = f"{CANVAS_BASE_URL}/api/v1/{endpoint}"
    all_data = []

    while url:
        response = requests.get(url, headers=headers, params=params, timeout=30)
        response.raise_for_status()
        data = response.json()
        if isinstance(data, list):
            all_data.extend(data)
        else:
            all_data.append(data)
        if "next" in response.links:
            url = response.links["next"]["url"]
            params = None
        else:
            url = None

    return all_data


# ============================================================================
# DATA FETCHING
# ============================================================================

def fetch_courses() -> List[Dict[str, Any]]:
    """Fetch active courses, optionally filtered by KEEP_COURSE_IDS."""
    print("📚 Fetching courses...")
    courses = canvas_get("courses", {
        "enrollment_state": "active",
        "include[]": ["term", "course_progress"],
        "per_page": 100,
    })

    if KEEP_COURSE_IDS:
        courses = [c for c in courses if int(c["id"]) in KEEP_COURSE_IDS]
        print(f"   Filtered to {len(courses)} course(s) from KEEP_COURSE_IDS")
    else:
        print(f"   Found {len(courses)} active course(s) (no filter applied)")

    for course in courses:
        print(f"   - {course['name']}  (id: {course['id']})")

    return courses


def fetch_assignments(course_id: int) -> List[Dict[str, Any]]:
    """Fetch all assignments for a course, including submission data."""
    return canvas_get(f"courses/{course_id}/assignments", {
        "per_page": 100,
        "include[]": ["submission"],
    })


def fetch_calendar_events(course_ids: List[int]) -> List[Dict[str, Any]]:
    """Fetch assignment-type calendar events for the given courses."""
    print("📅 Fetching calendar events...")
    events = canvas_get("calendar_events", {
        "type": "assignment",
        "context_codes[]": [f"course_{cid}" for cid in course_ids],
        "per_page": 100,
        "all_events": True,
    })
    print(f"   Found {len(events)} calendar event(s)")
    return events


# ============================================================================
# DATABASE
# ============================================================================

def init_database() -> sqlite3.Connection:
    """Create (or open) the SQLite database and ensure schema exists."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY,
            name TEXT,
            course_code TEXT,
            term_name TEXT,
            term_start TEXT,
            term_end TEXT,
            workflow_state TEXT
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS assignments (
            id INTEGER PRIMARY KEY,
            course_id INTEGER,
            name TEXT,
            description TEXT,
            due_at TEXT,
            points_possible REAL,
            submission_types TEXT,
            workflow_state TEXT,
            html_url TEXT,
            FOREIGN KEY (course_id) REFERENCES courses(id)
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY,
            assignment_id INTEGER,
            course_id INTEGER,
            submitted_at TEXT,
            workflow_state TEXT,
            grade TEXT,
            score REAL,
            late INTEGER,
            missing INTEGER,
            excused INTEGER,
            FOREIGN KEY (assignment_id) REFERENCES assignments(id)
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS calendar_events (
            event_id TEXT PRIMARY KEY,
            title TEXT,
            description TEXT,
            start_at TEXT,
            end_at TEXT,
            context_code TEXT,
            workflow_state TEXT,
            html_url TEXT
        )
    """)
    conn.commit()
    return conn


def save_to_database(
    conn: sqlite3.Connection,
    courses: List[Dict],
    assignments_by_course: Dict[int, List[Dict]],
    events: List[Dict],
) -> None:
    """Refresh all tables with the latest fetched data."""
    cursor = conn.cursor()
    print("\n💾 Saving to database...")

    cursor.execute("DELETE FROM calendar_events")
    cursor.execute("DELETE FROM submissions")
    cursor.execute("DELETE FROM assignments")
    cursor.execute("DELETE FROM courses")

    for course in courses:
        term = course.get("term", {})
        cursor.execute(
            "INSERT INTO courses VALUES (?,?,?,?,?,?,?)",
            (
                course["id"],
                course["name"],
                course.get("course_code"),
                term.get("name"),
                term.get("start_at"),
                term.get("end_at"),
                course.get("workflow_state"),
            ),
        )

    for course_id, assignments in assignments_by_course.items():
        for a in assignments:
            cursor.execute(
                "INSERT INTO assignments VALUES (?,?,?,?,?,?,?,?,?)",
                (
                    a["id"],
                    course_id,
                    a["name"],
                    a.get("description", ""),
                    a.get("due_at"),
                    a.get("points_possible"),
                    ",".join(a.get("submission_types", [])),
                    a.get("workflow_state"),
                    a.get("html_url"),
                ),
            )
            sub = a.get("submission")
            if sub:
                cursor.execute(
                    "INSERT INTO submissions VALUES (?,?,?,?,?,?,?,?,?,?)",
                    (
                        sub.get("id"),
                        a["id"],
                        course_id,
                        sub.get("submitted_at"),
                        sub.get("workflow_state"),
                        sub.get("grade"),
                        sub.get("score"),
                        1 if sub.get("late") else 0,
                        1 if sub.get("missing") else 0,
                        1 if sub.get("excused") else 0,
                    ),
                )

    for event in events:
        cursor.execute(
            "INSERT INTO calendar_events VALUES (?,?,?,?,?,?,?,?)",
            (
                str(event.get("id")),
                event.get("title"),
                event.get("description", ""),
                event.get("start_at"),
                event.get("end_at"),
                event.get("context_code"),
                event.get("workflow_state"),
                event.get("html_url"),
            ),
        )

    conn.commit()
    print(f"   ✅ Saved to {DB_FILE}")


# ============================================================================
# SUMMARY GENERATION
# ============================================================================

def generate_summary(conn: sqlite3.Connection) -> None:
    """Write a human-readable Markdown summary of upcoming and missing work."""
    cursor = conn.cursor()
    now = datetime.now(timezone.utc)

    lines = [
        "# 🎯 Canvas Dashboard Summary",
        f"\n**Generated:** {now.strftime('%Y-%m-%d %H:%M:%S UTC')}\n",
        "---\n",
        "## 📋 Upcoming Assignments (Next 14 Days)\n",
    ]

    cursor.execute("""
        SELECT a.name, a.due_at, c.name, a.points_possible,
               s.workflow_state, s.missing, a.html_url
        FROM assignments a
        JOIN courses c ON a.course_id = c.id
        LEFT JOIN submissions s ON a.id = s.assignment_id
        WHERE a.due_at IS NOT NULL
          AND datetime(a.due_at) >= datetime('now')
          AND datetime(a.due_at) <= datetime('now', '+14 days')
          AND a.workflow_state = 'published'
        ORDER BY a.due_at ASC
    """)
    upcoming = cursor.fetchall()

    if upcoming:
        for name, due_at, course, points, status, missing, url in upcoming:
            due_date = datetime.fromisoformat(due_at.replace("Z", "+00:00"))
            days_until = (due_date - now).days
            status_emoji = "✅" if status == "submitted" else "❌" if missing else "⏳"
            urgency = "🔥" if days_until <= 2 else "⚠️" if days_until <= 7 else ""
            lines += [
                f"- {urgency} **{name}** {status_emoji}",
                f"  - Course: {course}",
                f"  - Due: {due_date.strftime('%a, %b %d at %I:%M %p')} ({days_until} days)",
                f"  - Points: {points}",
                f"  - Status: {status or 'Not submitted'}",
                f"  - [Link]({url})\n",
            ]
    else:
        lines.append("*No upcoming assignments in the next 14 days* 🎉\n")

    lines += ["\n## ⚠️ Missing or Not Submitted\n"]

    cursor.execute("""
        SELECT a.name, a.due_at, c.name, a.points_possible, a.html_url
        FROM assignments a
        JOIN courses c ON a.course_id = c.id
        LEFT JOIN submissions s ON a.id = s.assignment_id
        WHERE a.workflow_state = 'published'
          AND (s.missing = 1 OR (s.workflow_state IS NULL AND a.due_at < datetime('now')))
        ORDER BY a.due_at DESC
    """)
    missing_rows = cursor.fetchall()

    if missing_rows:
        for name, due_at, course, points, url in missing_rows:
            lines += [
                f"- ❌ **{name}**",
                f"  - Course: {course}",
                *([ f"  - Was due: {due_at}" ] if due_at else []),
                f"  - Points: {points}",
                f"  - [Link]({url})\n",
            ]
    else:
        lines.append("*Nothing missing!* ✨\n")

    lines += ["\n## 📚 Current Courses\n"]
    cursor.execute("""
        SELECT c.name, c.term_name,
               COUNT(DISTINCT a.id),
               COUNT(DISTINCT CASE WHEN s.workflow_state = 'submitted' THEN a.id END)
        FROM courses c
        LEFT JOIN assignments a ON c.id = a.course_id AND a.workflow_state = 'published'
        LEFT JOIN submissions s ON a.id = s.assignment_id
        GROUP BY c.id, c.name, c.term_name
    """)
    for course_name, term, total, submitted in cursor.fetchall():
        lines += [
            f"- **{course_name}** ({term})",
            f"  - Assignments completed: {submitted}/{total}\n",
        ]

    lines += ["\n## 📊 Quick Stats\n"]
    cursor.execute("SELECT COUNT(*) FROM assignments WHERE workflow_state='published'")
    total_assignments = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM submissions WHERE workflow_state='submitted'")
    submitted_count = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM submissions WHERE missing=1")
    missing_count = cursor.fetchone()[0]
    pct = (submitted_count / total_assignments * 100) if total_assignments else 0.0

    lines += [
        f"- Total published assignments: **{total_assignments}**",
        f"- Submitted: **{submitted_count}**",
        f"- Missing: **{missing_count}**",
        f"- Completion rate: **{pct:.1f}%**\n",
        "\n---\n",
        f"*Data stored in `{DB_FILE}` — query with SQLite for custom analysis*\n",
    ]

    summary_text = "\n".join(lines)
    with open(SUMMARY_FILE, "w") as f:
        f.write(summary_text)

    print(f"\n✅ Summary saved to {SUMMARY_FILE}\n")
    print(summary_text)


# ============================================================================
# MAIN
# ============================================================================

def main():
    print("\n" + "=" * 60)
    print("🎓  CANVAS DASHBOARD")
    print("=" * 60 + "\n")

    courses = fetch_courses()
    if not courses:
        print("⚠️  No courses found. Check your CANVAS_TOKEN and KEEP_COURSE_IDS settings.")
        return

    print("\n📝 Fetching assignments and submissions...")
    assignments_by_course: Dict[int, List[Dict]] = {}
    for course in courses:
        cid = course["id"]
        assignments = fetch_assignments(cid)
        assignments_by_course[cid] = assignments
        print(f"   - {course['name']}: {len(assignments)} assignment(s)")

    course_ids = [c["id"] for c in courses]
    events = fetch_calendar_events(course_ids)

    conn = init_database()
    save_to_database(conn, courses, assignments_by_course, events)
    generate_summary(conn)
    conn.close()

    print("\n" + "=" * 60)
    print("✨  Done!")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    main()
