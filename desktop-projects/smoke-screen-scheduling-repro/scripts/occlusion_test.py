"""Full-disk coverage occlusion test (numerical placeholder implementation)."""

from typing import Iterable


def line_of_sight_blocked(missile_pos, target_pos, smoke_clouds: Iterable[dict]) -> bool:
    """Return True if LOS is fully blocked (placeholder)."""
    return any(c.get("effective", False) for c in smoke_clouds)


def occlusion_time_series(states):
    return [line_of_sight_blocked(s["missile"], s["target"], s["smoke"]) for s in states]
