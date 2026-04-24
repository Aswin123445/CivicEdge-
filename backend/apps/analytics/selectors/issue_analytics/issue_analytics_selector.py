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
from apps.issues.models.issues import Issue



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
            filter=Q(status__in=[
                IssueStatus.OPEN,
                IssueStatus.IN_REVIEW,
                IssueStatus.IN_PROGRESS,
                IssueStatus.REOPENED,
            ]),
        ),
    )

 
    return {**agg}



# ──────────────────────────────────────────────────────────────────────────────
# Trend chart  (reported vs resolved per month)
# ──────────────────────────────────────────────────────────────────────────────

def get_trend_chart(qs: QuerySet) -> list[dict]:
    """
    Groups issues by calendar month and counts reported vs resolved.

    Returns rows sorted chronologically so the frontend can use them
    directly as <LineChart data={...}>.
    """
    rows = (
        qs.annotate(month=TruncMonth("created_at"))
        .values("month")
        .annotate(
            reported=Count("id"),
            resolved=Count(
                "id",
                filter=Q(status=IssueStatus.RESOLVED),
            ),
        )
        .order_by("month")
    )

    return [
        {
            "label": row["month"].strftime("%b %Y"),
            "reported": row["reported"],
            "resolved": row["resolved"],
        }
        for row in rows
    ]


# ──────────────────────────────────────────────────────────────────────────────
# Funnel chart  (lifecycle stage counts)
# ──────────────────────────────────────────────────────────────────────────────

# Maps each IssueStatus to the last funnel stage it has passed through.
# An issue in RESOLVED state has passed all stages.
# We count cumulative membership so the funnel is strictly non-increasing.
_FUNNEL_STAGES: list[tuple[str, list]] = [
    # Every non-draft issue has been reported, including reopened ones.
    ("Reported", [
        IssueStatus.OPEN,
        IssueStatus.IN_REVIEW,
        IssueStatus.IN_PROGRESS,
        IssueStatus.RESOLVED,
        IssueStatus.CLOSED,
        IssueStatus.REJECTED,
        IssueStatus.CANCELLED,
        IssueStatus.REOPENED,
    ]),
    # Staff have looked at it (moved past raw OPEN).
    ("In Review", [
        IssueStatus.IN_REVIEW,
        IssueStatus.IN_PROGRESS,
        IssueStatus.RESOLVED,
        IssueStatus.CLOSED,
        IssueStatus.REJECTED,
        IssueStatus.CANCELLED,
        IssueStatus.REOPENED,
    ]),
    # Active work has started.
    ("In Progress", [
        IssueStatus.IN_PROGRESS,
        IssueStatus.RESOLVED,
        IssueStatus.CLOSED,
        IssueStatus.REOPENED,
    ]),
    # Fix was delivered (RESOLVED or subsequently CLOSED).
    ("Resolved", [
        IssueStatus.RESOLVED,
        IssueStatus.CLOSED,
    ]),
    # Formally closed — terminal success state.

]



def get_funnel_chart(qs: QuerySet) -> list[dict]:
    annotations = {}

    for idx, (stage, statuses) in enumerate(_FUNNEL_STAGES):
        alias = f"stage_{idx}"
        annotations[alias] = Count("id", filter=Q(status__in=statuses))

    agg = qs.aggregate(**annotations)

    return [
        {
            "stage": stage,
            "count": agg[f"stage_{idx}"]
        }
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