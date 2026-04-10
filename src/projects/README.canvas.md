# 🎓 Canvas Dashboard

Canvas's own interface buries what you need behind three menus, a notification badge, and a calendar that requires two clicks just to see a due date. This script runs every morning and produces a single Markdown file with everything that matters: what's due, what's missing, submission status per assignment, and a course-by-course completion rate.

It also writes everything to a local SQLite database, so if you want to know "what has no submission and is due in the next 14 days across all courses," you just write a query rather than clicking through four pages. The auto-generated summary runs on whatever schedule you set — daily, twice a day, whatever works for you — while the database is always there to query on demand.

---

## What it produces

| File | What it is |
|---|---|
| `canvas_summary.md` | Daily human-readable snapshot: upcoming work, missing assignments, per-course stats |
| `canvas_data.db` | SQLite database — query anything: overdue by course, completion rates, all submissions |

---

## Setup

### 1. Prerequisites

- Python 3.9+
- A Canvas account (any school that uses Instructure Canvas)

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure your environment

```bash
cp .env.example .env
```

Edit `.env`:

```
CANVAS_TOKEN=your_token_here
CANVAS_BASE_URL=https://your-school.instructure.com
KEEP_COURSE_IDS=123456,789012    # optional — leave blank for all active courses
OUTPUT_DIR=                       # optional — defaults to this folder
```

**Getting your Canvas token:**  
Canvas → your profile picture (top-left) → Settings → scroll to "Approved Integrations" → **+ New Access Token**

**Finding course IDs:**  
Open a course in Canvas. The URL will look like `/courses/204930` — that number is the course ID.

### 4. Run

```bash
python canvas_dashboard.py
```

---

## Automate it (run every morning)

### macOS — cron (simplest)

```bash
crontab -e
```

Add this line to run at 8:00 AM every day:

```
0 8 * * * cd /path/to/canvas-dashboard && .venv/bin/python canvas_dashboard.py >> canvas_dashboard.log 2>&1
```

### macOS — launchd (native, more reliable)

Create `~/Library/LaunchAgents/com.canvasdashboard.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.canvasdashboard</string>
    <key>ProgramArguments</key>
    <array>
        <string>/path/to/.venv/bin/python</string>
        <string>/path/to/canvas_dashboard.py</string>
    </array>
    <key>WorkingDirectory</key>
    <string>/path/to/canvas-dashboard</string>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key><integer>8</integer>
        <key>Minute</key><integer>0</integer>
    </dict>
    <key>StandardOutPath</key>
    <string>/path/to/canvas-dashboard/canvas_dashboard.log</string>
    <key>StandardErrorPath</key>
    <string>/path/to/canvas-dashboard/canvas_dashboard.log</string>
    <key>EnvironmentVariables</key>
    <dict>
        <key>PATH</key>
        <string>/usr/local/bin:/usr/bin:/bin</string>
    </dict>
</dict>
</plist>
```

Load it:
```bash
launchctl load ~/Library/LaunchAgents/com.canvasdashboard.plist
```

> **Note on external drives (macOS):** If you store this project on an external drive, replace `/path/to/` with the full volume path (e.g. `/Volumes/MyDrive/projects/canvas-dashboard/`). The script itself works fine on external drives — the only gotcha is that launchd runs before the drive mounts at login, so either delay the scheduled time or use a symlink from `~/canvas_dashboard → /Volumes/YourDrive/canvas-dashboard`.

### Linux / WSL — cron

Same as the macOS cron approach above.

### Windows — Task Scheduler

1. Open Task Scheduler → Create Basic Task
2. Trigger: Daily at your preferred time
3. Action: Start a program
   - Program: `C:\path\to\python.exe`
   - Arguments: `C:\path\to\canvas_dashboard.py`
   - Start in: `C:\path\to\canvas-dashboard\`

---

## Querying the database

```bash
sqlite3 canvas_data.db

-- Upcoming assignments
SELECT name, due_at FROM assignments WHERE due_at > datetime('now') ORDER BY due_at;

-- Missing work
SELECT a.name, c.name FROM submissions s
JOIN assignments a ON s.assignment_id = a.id
JOIN courses c ON a.course_id = c.id
WHERE s.missing = 1;

-- Completion rate by course
SELECT c.name,
       COUNT(DISTINCT a.id) AS total,
       COUNT(DISTINCT CASE WHEN s.workflow_state='submitted' THEN a.id END) AS submitted
FROM courses c
LEFT JOIN assignments a ON c.id = a.course_id
LEFT JOIN submissions s ON a.id = s.assignment_id
GROUP BY c.id;
```

---

## Security

- Your API token lives only in `.env` which is excluded from version control via `.gitignore`
- The token gives read access to your Canvas data — treat it like a password
- Revoke and regenerate tokens at any time: Canvas → Settings → Approved Integrations

---

## Notes on the course filter

`KEEP_COURSE_IDS` is optional. If you leave it blank, the script tracks all active enrollments. If your school uses a multi-term system and old courses keep showing up as "active," add just your current course IDs to filter them out.

---

## License

MIT — use it, modify it, share it.
