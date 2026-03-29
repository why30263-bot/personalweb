"""Shared geometry and state definitions for smoke-screen scheduling."""

from dataclasses import dataclass
from typing import Tuple


@dataclass
class Target:
    position: Tuple[float, float, float]
    radius: float


@dataclass
class Missile:
    id: str
    position: Tuple[float, float, float]
    velocity: Tuple[float, float, float]


@dataclass
class UAV:
    id: str
    position: Tuple[float, float, float]
    speed: float
    smoke_capacity: int


@dataclass
class SmokeCloud:
    center: Tuple[float, float, float]
    radius: float
    sink_rate: float


def update_position(p, v, dt):
    return (p[0] + v[0] * dt, p[1] + v[1] * dt, p[2] + v[2] * dt)
