"""Angle-domain elimination to shrink feasible UAV heading search space."""


def eliminate_heading_ranges(initial_ranges, constraints):
    ranges = list(initial_ranges)
    for c in constraints:
        ranges = [r for r in ranges if not (r[1] < c[0] or r[0] > c[1])]
    return ranges
