"""Evaluation utilities for baseline vs optimized plans."""

import csv
from pathlib import Path


def write_summary(out_dir: str, rows):
    p = Path(out_dir) / "tables" / "summary_metrics.csv"
    p.parent.mkdir(parents=True, exist_ok=True)
    with p.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["scenario", "strategy", "occlusion_time_s"])
        w.writeheader()
        w.writerows(rows)


if __name__ == "__main__":
    write_summary("outputs", [
        {"scenario": "demo", "strategy": "baseline", "occlusion_time_s": 1.39},
        {"scenario": "demo", "strategy": "optimized", "occlusion_time_s": 25.691},
    ])
