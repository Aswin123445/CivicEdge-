"""
services.py — orchestrates the dashboard assembly.

Responsibilities:
  1. Parse and validate filter params from the request.
  2. Build ONE shared filtered queryset.
  3. Fan-out to all selectors with that queryset.
  4. Return a single data dict that the serializer can consume.

Nothing here touches the DB directly — that belongs in selectors.py.
"""

from __future__ import annotations

import datetime
from typing import TypedDict

from django.utils import timezone
from datetime import timezone as python_timezone

from apps.analytics.selectors.user_analytics.user_analytics_selector import (
    get_top_solver_performance,
    get_user_distribution,
    get_user_growth,
    get_user_stats,
    get_zone_solver_chart,
)


# ──────────────────────────────────────────────────────────────────────────────
# Supported range shortcuts
# ──────────────────────────────────────────────────────────────────────────────

_RANGE_DAYS: dict[str, int] = {
    "7d": 7,
    "30d": 30,
    "90d": 90,
    "1y": 365,
}


class FilterParams(TypedDict):
    range: str
    date_from: datetime.date | None
    date_to: datetime.date | None


# ──────────────────────────────────────────────────────────────────────────────
# Filter resolver
# ──────────────────────────────────────────────────────────────────────────────


def resolve_filters(
    range_param: str | None,
    date_from: datetime.date | None,
    date_to: datetime.date | None,
) -> tuple[FilterParams, datetime.datetime | None, datetime.datetime | None]:
    """
    Converts raw query params into a canonical FilterParams dict plus
    the datetime bounds used to slice the queryset.

    Returns (filter_meta, from_dt, to_dt).
    from_dt / to_dt may be None (meaning "no bound").
    """
    range_param = (range_param or "30d").lower()

    if range_param == "custom":
        # Caller must supply both dates; if missing, fall back to 30d
        if date_from and date_to:
            from_dt = datetime.datetime.combine(
                date_from, datetime.time.min, tzinfo=python_timezone.utc
            )
            to_dt = datetime.datetime.combine(
                date_to, datetime.time.max, tzinfo=python_timezone.utc
            )
            return (
                {"range": "custom", "date_from": date_from, "date_to": date_to},
                from_dt,
                to_dt,
            )
        # Fall through to default
        range_param = "30d"

    days = _RANGE_DAYS.get(range_param, 30)
    to_dt = timezone.now()
    from_dt = to_dt - datetime.timedelta(days=days)

    return (
        {"range": range_param, "date_from": None, "date_to": None},
        from_dt,
        to_dt,
    )


# ──────────────────────────────────────────────────────────────────────────────
# Shared queryset builder
# ─────────────────────────────────────────────────────────────────────────────


def get_user_analytics_service(filters: dict) -> dict:
    """
    Orchestrates the user analytics dashboard.

    `filters` comes from UserAnalyticsFilterSerializer.validated_data
    so it is already clean — no validation logic here.

    Steps:
      1. Resolve the date window from filter params.
      2. Call each selector independently (no shared queryset needed
         here because each selector targets different dimensions).
      3. Return the assembled payload dict.
    """
    range_param = filters.get("range", "30d")
    date_from = filters.get("date_from")
    date_to = filters.get("date_to")

    # Reuse the same resolver from the issues service
    _, from_dt, to_dt = resolve_filters(range_param, date_from, date_to)

    # Convert datetimes → dates for the user selectors
    start_date = from_dt.date() if from_dt else None
    end_date = to_dt.date() if to_dt else None

    return {
        "stats": get_user_stats(start_date, end_date),
        "distribution": get_user_distribution(),
        "growth": get_user_growth(start_date, end_date),
        "zone_solver_chart": get_zone_solver_chart(),
        "top_solver_performance": get_top_solver_performance(start_date, end_date),
    }
