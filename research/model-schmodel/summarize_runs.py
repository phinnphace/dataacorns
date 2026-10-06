#!/usr/bin/env python3
"""Index Model Shmodel downloaded runs without asking the observed model."""

from __future__ import annotations

import argparse
import csv
import json
import re
from pathlib import Path
from typing import Any, Iterable


RECEIPT_PATTERN = re.compile(r"MODEL_SHMODEL_RECEIPT=(\{[^\r\n]*\})")


def iter_files(paths: Iterable[Path]) -> Iterable[Path]:
    for path in paths:
        if path.is_file():
            yield path
        elif path.is_dir():
            yield from (candidate for candidate in path.rglob("*") if candidate.is_file())


def extract_receipts(path: Path) -> list[dict[str, Any]]:
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return []

    receipts: list[dict[str, Any]] = []

    if path.name.endswith(".run.json"):
        try:
            run = json.loads(text)
        except json.JSONDecodeError:
            run = {}
        model = (run.get("modelVersion") or {}).get("slug", "")
        for result in run.get("results", []):
            payload = result.get("dictResult") or {}
            receipt = payload.get("receipt")
            if isinstance(receipt, dict):
                extracted = dict(receipt)
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
                extracted["receipt_file"] = str(path)
                receipts.append(extracted)
            elif payload.get("observer_extraction_status"):
                receipts.append(
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
                        "receipt_file": str(path),
                    }
                )

    if receipts:
        return receipts

    for match in RECEIPT_PATTERN.finditer(text):
        try:
            receipt = json.loads(match.group(1))
        except json.JSONDecodeError:
            continue
        if "removed_row_positions_one_based" not in receipt:
            receipt["removed_row_positions_one_based"] = receipt.get(
                "rows_dropped_one_based", []
            )
        receipt["receipt_file"] = str(path)
        receipts.append(receipt)
    return receipts


def flatten(receipt: dict[str, Any]) -> dict[str, Any]:
    flattened: dict[str, Any] = {}
    for key, value in receipt.items():
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

    receipts: list[dict[str, Any]] = []
    for path in iter_files(args.paths):
        receipts.extend(extract_receipts(path))

    print(json.dumps(receipts, indent=2, ensure_ascii=False, sort_keys=True))

    if args.csv_path and receipts:
        rows = [flatten(receipt) for receipt in receipts]
        fieldnames = sorted({key for row in rows for key in row})
        with args.csv_path.open("w", encoding="utf-8", newline="") as handle:
            writer = csv.DictWriter(handle, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)

    return 0 if receipts else 1


if __name__ == "__main__":
    raise SystemExit(main())
