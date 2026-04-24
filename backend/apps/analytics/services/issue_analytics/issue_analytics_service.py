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

from datetime import timezone
from django.utils import timezone as django_timezone

from apps.analytics.selectors.issue_analytics.issue_analytics_selector import get_category_chart, get_funnel_chart, get_issue_stats, get_trend_chart, get_zone_chart
from apps.issues.models.issues import Issue



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
            from_dt = datetime.datetime.combine(date_from, datetime.time.min, tzinfo=timezone.utc)
            to_dt = datetime.datetime.combine(date_to, datetime.time.max, tzinfo=timezone.utc)
            return (
                {"range": "custom", "date_from": date_from, "date_to": date_to},
                from_dt,
                to_dt,
            )
        # Fall through to default
        range_param = "30d"

    days = _RANGE_DAYS.get(range_param, 30)
    to_dt = django_timezone.now()
    from_dt = to_dt - datetime.timedelta(days=days)

    return (
        {"range": range_param, "date_from": None, "date_to": None},
        from_dt,
        to_dt,
    )


# ──────────────────────────────────────────────────────────────────────────────
# Shared queryset builder
# ──────────────────────────────────────────────────────────────────────────────

def get_filtered_issue_queryset(from_dt, to_dt):
    """
    Returns the ONE queryset that all selectors share.

    - Excludes drafts (is_draft=True).
    - Excludes soft-deleted issues (is_active=False).
    - Applies date bounds on created_at.
    - Uses select_related to avoid N+1 in any selector that accesses
      category or location (defensive; selectors use .values() mostly).
    """
    qs = Issue.objects.filter(
        is_draft=False,
        is_active=True,
    ).select_related("category", "location__zone")

    if from_dt:
        qs = qs.filter(created_at__gte=from_dt)
    if to_dt:
        qs = qs.filter(created_at__lte=to_dt)

    return qs


# ──────────────────────────────────────────────────────────────────────────────
# Dashboard assembler  (the main service function)
# ──────────────────────────────────────────────────────────────────────────────

def get_issues_dashboard(
    range_param: str | None = None,
    date_from: datetime.date | None = None,
    date_to: datetime.date | None = None,
) -> dict:
    """
    Assembles the complete dashboard payload.

    Called by the view; returns a plain dict the serializer can validate
    and render.  All DB work is delegated to selectors.
    """
    filter_meta, from_dt, to_dt = resolve_filters(range_param, date_from, date_to)

    # Single shared queryset — critical: pass to every selector unchanged.
    qs = get_filtered_issue_queryset(from_dt, to_dt)

    return {
        "filters": filter_meta,
        "stats": get_issue_stats(qs),
        "trend_chart": get_trend_chart(qs),
        "funnel_chart": get_funnel_chart(qs),
        "zone_chart": get_zone_chart(qs),
        "category_chart": get_category_chart(qs),
    }