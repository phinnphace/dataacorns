#!/usr/bin/env python3
"""Index Model Shmodel downloaded runs without asking the observed model."""

from __future__ import annotations

import argparse
import csv
import json
import re
from pathlib import Path
from typing import Any, Iterable


RUN_RECORD_PATTERN = re.compile(r"MODEL_SHMODEL_(?:RUN_RECORD|RECEIPT)=(\{[^\r\n]*\})")


def iter_files(paths: Iterable[Path]) -> Iterable[Path]:
    for path in paths:
        if path.is_file():
            yield path
        elif path.is_dir():
            yield from (candidate for candidate in path.rglob("*") if candidate.is_file())


def extract_run_records(path: Path) -> list[dict[str, Any]]:
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return []

    run_records: list[dict[str, Any]] = []

    if path.name.endswith(".run.json"):
        try:
            run = json.loads(text)
        except json.JSONDecodeError:
            run = {}
        model = (run.get("modelVersion") or {}).get("slug", "")
        for result in run.get("results", []):
            payload = result.get("dictResult") or {}
            run_record = payload.get("run_record")
            if run_record is None:
                run_record = payload.get("receipt")  # Legacy downloaded-run field.
            if isinstance(run_record, dict):
                extracted = dict(run_record)
                if "removed_row_positions_one_based" not in extracted:
                    extracted["removed_row_positions_one_based"] = extracted.get(
                        "rows_dropped_one_based", []
                    )
                extracted["model"] = model
                extracted["task_version"] = (run.get("taskVersion") or {}).get(
                    "versionNumber", ""
                )
                extracted["dataset_sha256"] = payload.get("dataset_sha256", "")
                extracted["protocol_sha256"] = payload.get("protocol_sha256", "")
                extracted["source_file"] = str(path)
                run_records.append(extracted)
            elif payload.get("observer_extraction_status"):
                run_records.append(
                    {
                        "model": model,
                        "task_version": (run.get("taskVersion") or {}).get(
                            "versionNumber", ""
                        ),
                        "protocol_version": payload.get("protocol_version", ""),
                        "protocol_sha256": payload.get("protocol_sha256", ""),
                        "dataset_sha256": payload.get("dataset_sha256", ""),
                        "model_facing_call_count": payload.get(
                            "model_facing_call_count", ""
                        ),
                        "generated_code_present": bool(
                            (payload.get("generated_code") or "").strip()
                        ),
                        "stdout_present": bool((payload.get("stdout") or "").strip()),
                        "stderr": payload.get("stderr", ""),
                        "observer_extraction_status": payload.get(
                            "observer_extraction_status", ""
                        ),
                        "source_file": str(path),
                    }
                )

    if run_records:
        return run_records

    for match in RUN_RECORD_PATTERN.finditer(text):
        try:
            run_record = json.loads(match.group(1))
        except json.JSONDecodeError:
            continue
        if "removed_row_positions_one_based" not in run_record:
            run_record["removed_row_positions_one_based"] = run_record.get(
                "rows_dropped_one_based", []
            )
        run_record["source_file"] = str(path)
        run_records.append(run_record)
    return run_records


def flatten(run_record: dict[str, Any]) -> dict[str, Any]:
    flattened: dict[str, Any] = {}
    for key, value in run_record.items():
        if isinstance(value, (dict, list)):
            flattened[key] = json.dumps(value, ensure_ascii=False, sort_keys=True)
        else:
            flattened[key] = value
    return flattened


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("paths", nargs="+", type=Path, help="Downloaded run files or directories")
    parser.add_argument("--csv", dest="csv_path", type=Path, help="Optional summary CSV output")
    args = parser.parse_args()

    run_records: list[dict[str, Any]] = []
    for path in iter_files(args.paths):
        run_records.extend(extract_run_records(path))

    print(json.dumps(run_records, indent=2, ensure_ascii=False, sort_keys=True))

    if args.csv_path and run_records:
        rows = [flatten(run_record) for run_record in run_records]
        fieldnames = sorted({key for row in rows for key in row})
        with args.csv_path.open("w", encoding="utf-8", newline="") as handle:
            writer = csv.DictWriter(handle, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)

    return 0 if run_records else 1


if __name__ == "__main__":
    raise SystemExit(main())
