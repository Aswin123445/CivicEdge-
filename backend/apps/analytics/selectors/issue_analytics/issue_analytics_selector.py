"""
selectors.py — all database reads for the issues dashboard.

Each function receives the pre-filtered queryset from the service layer
and returns plain Python data ready for the serializer.

Rule: never re-filter or reach outside qs.  One shared queryset.
"""

from __future__ import annotations

from django.db.models import (
    Count,
    F,
    Q,
    QuerySet,
)
from django.db.models.functions import TruncMonth

from apps.issues.utils.enums.issue_status import IssueStatus


# ──────────────────────────────────────────────────────────────────────────────
# KPI stats
# ──────────────────────────────────────────────────────────────────────────────


def get_issue_stats(qs: QuerySet) -> dict:
    """
    Returns total, resolved, pending counts and average resolution time.

    Resolution time = cancelled_at - created_at for resolved issues.
    We use ExpressionWrapper so the subtraction stays inside the DB.
    """
    agg = qs.aggregate(
        total_issues=Count("id"),
        resolved_issues=Count(
            "id",
            filter=Q(status=IssueStatus.RESOLVED),
        ),
        rejected_issues=Count(
            "id",
            filter=Q(status=IssueStatus.REJECTED),
        ),
        pending_issues=Count(
            "id",
            filter=Q(
                status__in=[
                    IssueStatus.OPEN,
                    IssueStatus.IN_REVIEW,
                    IssueStatus.IN_PROGRESS,
                    IssueStatus.REOPENED,
                ]
            ),
        ),
    )

    return {**agg}


# ──────────────────────────────────────────────────────────────────────────────
# Trend chart  (reported vs resolved per month)
# ──────────────────────────────────────────────────────────────────────────────

# selectors.py

import datetime
from dateutil.relativedelta import relativedelta

from django.db.models import Count, Q, QuerySet
from django.db.models.functions import TruncDay, TruncMonth

from apps.issues.models.issues import IssueStatus


def get_trend_chart(qs: QuerySet, from_dt, to_dt) -> list[dict]:
    """
    Dynamic trend chart based on selected date range.

    Rules:
    - <= 31 days   -> group by day
    - > 31 days    -> group by month

    Returns:
    [
        {
            "label": "01 Apr" / "Apr 2026",
            "reported": 10,
            "resolved": 4
        }
    ]
    """

    if not from_dt or not to_dt:
        return []

    total_days = (to_dt.date() - from_dt.date()).days + 1

    # Decide bucket size
    if total_days <= 31:
        trunc_func = TruncDay
        label_format = "%d %b"
        mode = "day"
    else:
        trunc_func = TruncMonth
        label_format = "%b %Y"
        mode = "month"

    rows = (
        qs.annotate(period=trunc_func("created_at"))
        .values("period")
        .annotate(
            reported=Count("id"),
            resolved=Count(
                "id",
                filter=Q(status=IssueStatus.RESOLVED),
            ),
        )
        .order_by("period")
    )

    # Convert DB rows to dict for easy lookup
    data_map = {
        (
            row["period"].date()
            if mode == "day"
            else row["period"].date().replace(day=1)
        ): row
        for row in rows
    }

    result = []

    current = from_dt.date()

    if mode == "month":
        current = current.replace(day=1)

    while current <= to_dt.date():

        key = current
        row = data_map.get(key)

        result.append(
            {
                "label": current.strftime(label_format),
                "reported": row["reported"] if row else 0,
                "resolved": row["resolved"] if row else 0,
            }
        )

        # Move next bucket
        if mode == "day":
            current += datetime.timedelta(days=1)
        else:
            current += relativedelta(months=1)

    return result


# ──────────────────────────────────────────────────────────────────────────────
# Funnel chart  (lifecycle stage counts)
# ──────────────────────────────────────────────────────────────────────────────

# Maps each IssueStatus to the last funnel stage it has passed through.
# An issue in RESOLVED state has passed all stages.
# We count cumulative membership so the funnel is strictly non-increasing.
_FUNNEL_STAGES: list[tuple[str, list]] = [
    # Every non-draft issue has been reported, including reopened ones.
    (
        "Reported",
        [
            IssueStatus.OPEN,
            IssueStatus.IN_REVIEW,
            IssueStatus.IN_PROGRESS,
            IssueStatus.RESOLVED,
            IssueStatus.CLOSED,
            IssueStatus.REJECTED,
            IssueStatus.CANCELLED,
            IssueStatus.REOPENED,
        ],
    ),
    # Staff have looked at it (moved past raw OPEN).
    (
        "In Review",
        [
            IssueStatus.IN_REVIEW,
            IssueStatus.IN_PROGRESS,
            IssueStatus.RESOLVED,
            IssueStatus.CLOSED,
            IssueStatus.REJECTED,
            IssueStatus.CANCELLED,
            IssueStatus.REOPENED,
        ],
    ),
    # Active work has started.
    (
        "In Progress",
        [
            IssueStatus.IN_PROGRESS,
            IssueStatus.RESOLVED,
            IssueStatus.CLOSED,
            IssueStatus.REOPENED,
        ],
    ),
    # Fix was delivered (RESOLVED or subsequently CLOSED).
    (
        "Resolved",
        [
            IssueStatus.RESOLVED,
            IssueStatus.CLOSED,
        ],
    ),
    # Formally closed — terminal success state.
]


def get_funnel_chart(qs: QuerySet) -> list[dict]:
    annotations = {}

    for idx, (stage, statuses) in enumerate(_FUNNEL_STAGES):
        alias = f"stage_{idx}"
        annotations[alias] = Count("id", filter=Q(status__in=statuses))

    agg = qs.aggregate(**annotations)

    return [
        {"stage": stage, "count": agg[f"stage_{idx}"]}
        for idx, (stage, _) in enumerate(_FUNNEL_STAGES)
    ]


# ──────────────────────────────────────────────────────────────────────────────
# Zone chart  (issues per ward / zone)
# ──────────────────────────────────────────────────────────────────────────────


def get_zone_chart(qs: QuerySet) -> list[dict]:
    """
    Groups issues by the zone attached to their location record.

    Issues without a location are excluded (location is a OneToOneField
    with default=None so some drafts may lack one).
    """
    rows = (
        qs.filter(location__zone__isnull=False)
        .values(zone_name=F("location__zone__name"))
        .annotate(issues=Count("id"))
        .order_by("-issues")
    )

    return [{"zone": row["zone_name"], "issues": row["issues"]} for row in rows]


# ──────────────────────────────────────────────────────────────────────────────
# Category chart  (issues per category — pie slices)
# ──────────────────────────────────────────────────────────────────────────────


def get_category_chart(qs: QuerySet) -> list[dict]:
    """
    Groups issues by IssueCategory and counts them descending.
    Only active categories with at least one issue appear.
    """
    rows = (
        qs.filter(category__is_active=True)
        .values(name=F("category__name"))
        .annotate(value=Count("id"))
        .order_by("-value")
    )

    return [{"name": row["name"], "value": row["value"]} for row in rows]
