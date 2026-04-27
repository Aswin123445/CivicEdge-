from datetime import timedelta
from django.utils import timezone
from django.db.models import Count
from django.db.models.functions import TruncMonth

from apps.volunteer_army.models import (
    VolunteerGroup,
    VolunteerMembership,
    VolunteerEvent,
    EventParticipation,
)
from apps.volunteer_army.models.volunteer_group import VolunteerGroupStatus, MembershipType
from apps.volunteer_army.models.volunteer_membership import MembershipStatus
from apps.volunteer_army.models.volunteer_event import EventStatus
from apps.volunteer_army.models.event_participation import ParticipationStatus


# ---------------------------------------------------------------------------
# Date range helpers
# ---------------------------------------------------------------------------

RANGE_DELTAS = {
    "7d": timedelta(days=7),
    "30d": timedelta(days=30),
    "90d": timedelta(days=90),
    "1y": timedelta(days=365),
}


def resolve_date_range(range_param: str, date_from=None, date_to=None):
    """
    Returns (current_start, current_end, previous_start, previous_end).
    The previous window mirrors the current window duration for change_percent.
    """
    now = timezone.now()

    if range_param == "custom":
        if not date_from or not date_to:
            raise ValueError("date_from and date_to are required for custom range.")
        current_start = timezone.make_aware(
            timezone.datetime.combine(date_from, timezone.datetime.min.time())
        )
        current_end = timezone.make_aware(
            timezone.datetime.combine(date_to, timezone.datetime.max.time())
        )
    else:
        delta = RANGE_DELTAS.get(range_param)
        if not delta:
            raise ValueError(f"Unsupported range: {range_param}")
        current_end = now
        current_start = now - delta

    window = current_end - current_start
    previous_end = current_start
    previous_start = current_start - window

    return current_start, current_end, previous_start, previous_end


def _change_percent(current: int, previous: int) -> float:
    if previous == 0:
        return 100.0 if current > 0 else 0.0
    return round(((current - previous) / previous) * 100, 1)


# ---------------------------------------------------------------------------
# Scoped base querysets
# ---------------------------------------------------------------------------

def _groups_in_window(start, end):
    return VolunteerGroup.objects.filter(
        status=VolunteerGroupStatus.ACTIVE,
        is_active=True,
        created_at__range=(start, end),
    )


def _memberships_in_window(start, end):
    return VolunteerMembership.objects.filter(
        status=MembershipStatus.ACTIVE,
        is_active=True,
        joined_at__range=(start, end),
    )


def _events_in_window(start, end):
    now = timezone.now()
    return VolunteerEvent.objects.filter(
        status=EventStatus.PUBLISHED,
        is_active=True,
        end_time__gte = now,
        created_at__range=(start, end),
    )


def _participations_in_window(start, end):
    return EventParticipation.objects.filter(
        is_active=True,
        registered_at__range=(start, end),
    )


def _restricted_memberships_in_window(start, end):
    return _memberships_in_window(start, end).filter(
        group__membership_type=MembershipType.APPROVAL_REQUIRED,
    )


# ---------------------------------------------------------------------------
# KPI selectors
# ---------------------------------------------------------------------------

def get_kpis(current_start, current_end, previous_start, previous_end) -> dict:

    cur_groups   = _groups_in_window(current_start, current_end).count()
    prev_groups  = _groups_in_window(previous_start, previous_end).count()

    cur_members  = _memberships_in_window(current_start, current_end).count()
    prev_members = _memberships_in_window(previous_start, previous_end).count()

    cur_events   = _events_in_window(current_start, current_end).count()
    prev_events  = _events_in_window(previous_start, previous_end).count()

    cur_participations  = _participations_in_window(current_start, current_end).count()
    prev_participations = _participations_in_window(previous_start, previous_end).count()

    cur_restricted  = _restricted_memberships_in_window(current_start, current_end).count()
    prev_restricted = _restricted_memberships_in_window(previous_start, previous_end).count()

    return {
        "total_groups": {
            "value": cur_groups,
            "change_percent": _change_percent(cur_groups, prev_groups),
        },
        "total_members": {
            "value": cur_members,
            "change_percent": _change_percent(cur_members, prev_members),
        },
        "active_events": {
            "value": cur_events,
            "change_percent": _change_percent(cur_events, prev_events),
        },
        "event_participations": {
            "value": cur_participations,
            "change_percent": _change_percent(cur_participations, prev_participations),
        },
        "restricted_members": {
            "value": cur_restricted,
            "change_percent": _change_percent(cur_restricted, prev_restricted),
        },
        "new_members_month": {
            "value": cur_members,
            "change_percent": _change_percent(cur_members, prev_members),
        },
    }


# ---------------------------------------------------------------------------
# Growth selector
# ---------------------------------------------------------------------------

def get_member_growth(current_start, current_end) -> list:
    qs = (
        _memberships_in_window(current_start, current_end)
        .annotate(month=TruncMonth("joined_at"))
        .values("month")
        .annotate(joined=Count("id"))
        .order_by("month")
    )

    return [
        {
            "month": entry["month"].strftime("%b"),
            "joined": entry["joined"],
        }
        for entry in qs
    ]


# ---------------------------------------------------------------------------
# Group access distribution
# ---------------------------------------------------------------------------

def get_group_access_distribution() -> list:
    active_memberships = VolunteerMembership.objects.filter(
        status=MembershipStatus.ACTIVE, is_active=True
    )
    open_count = active_memberships.filter(
        group__membership_type=MembershipType.OPEN
    ).count()
    restricted_count = active_memberships.filter(
        group__membership_type=MembershipType.APPROVAL_REQUIRED
    ).count()

    return [
        {"name": "Open Groups", "value": open_count},
        {"name": "Restricted Groups", "value": restricted_count},
    ]


# ---------------------------------------------------------------------------
# Top participation groups
# ---------------------------------------------------------------------------

def get_top_participation_groups(current_start, current_end, limit: int = 5) -> list:
    qs = (
        _participations_in_window(current_start, current_end)
        .values("event__group__name")
        .annotate(participants=Count("id"))
        .order_by("-participants")[:limit]
    )

    return [
        {
            "group": entry["event__group__name"],
            "participants": entry["participants"],
        }
        for entry in qs
    ]


# ---------------------------------------------------------------------------
# Conversion funnel
# ---------------------------------------------------------------------------

def get_conversion_funnel(current_start, current_end) -> list:
    base_memberships = VolunteerMembership.objects.filter(
        is_active=True,
        created_at__range=(current_start, current_end),
    )

    applied       = base_memberships.count()
    docs_submitted = base_memberships.filter(
        status__in=[
            MembershipStatus.SUBMITTED,
            MembershipStatus.ACTIVE,
            MembershipStatus.REJECTED,
        ]
    ).count()
    approved = base_memberships.filter(status=MembershipStatus.ACTIVE).count()

    joined_event = (
        _participations_in_window(current_start, current_end)
        .values("membership")
        .distinct()
        .count()
    )

    repeat_contributor = (
        _participations_in_window(current_start, current_end)
        .filter(status=ParticipationStatus.VERIFIED)
        .values("membership")
        .annotate(event_count=Count("id"))
        .filter(event_count__gte=2)
        .count()
    )

    return [
        {"stage": "Applied",            "count": applied},
        {"stage": "Docs Submitted",     "count": docs_submitted},
        {"stage": "Approved",           "count": approved},
        {"stage": "Joined Event",       "count": joined_event},
        {"stage": "Repeat Contributor", "count": repeat_contributor},
    ]


# ---------------------------------------------------------------------------
# Master selector
# ---------------------------------------------------------------------------

def get_volunteer_army_analytics(
    range_param: str,
    date_from=None,
    date_to=None,
) -> dict:
    current_start, current_end, previous_start, previous_end = resolve_date_range(
        range_param, date_from, date_to
    )

    return {
        "kpis": get_kpis(current_start, current_end, previous_start, previous_end),
        "growth": get_member_growth(current_start, current_end),
        "group_access_distribution": get_group_access_distribution(),
        "top_participation_groups": get_top_participation_groups(current_start, current_end),
        "conversion_funnel": get_conversion_funnel(current_start, current_end),
    }