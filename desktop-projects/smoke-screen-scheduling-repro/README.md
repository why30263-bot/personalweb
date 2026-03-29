# Smoke-Screen Scheduling Reproduction (Scaffold)

This repository is a reproducible project scaffold for the paper:

**Multi-stage Elimination-Optimization for Cooperative Smoke-Screen Scheduling Against Multiple Missiles**

## Project Goal
Reconstruct the main workflow described in the paper:

1. Build physical/geometric engagement model
2. Implement full-disk coverage occlusion test
3. Implement angle-domain elimination to shrink feasible heading ranges
4. Solve staged optimization problems:
   - single-UAV single-smoke
   - single-UAV multi-smoke
   - multi-UAV multi-missile
5. Evaluate total occlusion time and compare with baseline strategy

## Notes
- This is a method-faithful scaffold intended for research reconstruction.
- Scripts are organized to match the paper pipeline.
- You can plug in your own scenario parameters and data.

## Quick Structure
- `configs/base.yaml`: global parameters and scenario defaults
- `scripts/model_geometry.py`: target/missile/UAV/smoke geometry modeling
- `scripts/occlusion_test.py`: full-disk coverage & numerical occlusion
- `scripts/angle_elimination.py`: heading-angle feasible interval elimination
- `scripts/opt_single_single.py`: single UAV + single smoke optimization
- `scripts/opt_single_multi.py`: single UAV + multi-smoke optimization
- `scripts/opt_multi_multi.py`: multi-UAV + multi-missile optimization
- `scripts/evaluate.py`: occlusion-time metrics and baseline comparison
- `scripts/plot_results.py`: figure generation

## Expected Output
- `outputs/tables/summary_metrics.csv`
- `outputs/figures/*.png`

## Author
- Haoyi Wu
