"""Plot placeholders for paper-style figures."""

from pathlib import Path
import matplotlib.pyplot as plt


def save_placeholder_figure(out_path: str):
    Path(out_path).parent.mkdir(parents=True, exist_ok=True)
    fig, ax = plt.subplots(figsize=(8, 4))
    ax.set_title("Occlusion Time Comparison (Placeholder)")
    ax.bar(["Baseline", "Optimized"], [1.39, 25.691])
    fig.tight_layout()
    fig.savefig(out_path, dpi=150)


if __name__ == "__main__":
    save_placeholder_figure("outputs/figures/occlusion_comparison.png")
