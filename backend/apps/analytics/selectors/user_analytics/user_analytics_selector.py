"""
selectors.py — all database reads for the issues dashboard.

Each function receives the pre-filtered queryset from the service layer
and returns plain Python data ready for the serializer.

Rule: never re-filter or reach outside qs.  One shared queryset.
"""
from __future__ import annotations

from django.db.models import (
    Count,
    Q,
)
from django.db.models.functions import TruncMonth, TruncDate, TruncWeek

from django.contrib.auth import get_user_model
from shared.enums.user_role import UserRole
from apps.user.models.user import Zone
from django.utils.timezone import now
User = get_user_model()


# ──────────────────────────────────────────────────────────────────────────────
# Stats
# ──────────────────────────────────────────────────────────────────────────────

def get_user_stats(start_date, end_date) -> dict:
    """
    KPI card data.

    total_users / role counts are across ALL time — they are absolute
    counts of who is in the system, not filtered by the selected period.

    new_this_period and active_users respect the date filter.
    """
    today = now()
    month_start = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    all_users = User.objects.filter(is_active=True)

    period_qs = all_users.filter(
        created_at__date__gte=start_date,
        created_at__date__lte=end_date,
    )

    agg = all_users.aggregate(
        total_users=Count("id"),
        new_users_this_month = Count("id", filter=Q(created_at__date__gte=month_start)),
        citizens=Count("id", filter=Q(role=UserRole.CITIZEN)),
        solvers=Count("id", filter=Q(role=UserRole.SOLVER)),
        admins=Count("id", filter=Q(role=UserRole.ADMIN)),
    )

    return {
        **agg,
        "new_this_period": period_qs.count(),
        # Active = logged in at least once during the period
        "active_users": all_users.filter(
            last_login__date__gte=start_date,
            last_login__date__lte=end_date,
        ).count(),
    }


# ──────────────────────────────────────────────────────────────────────────────
# Distribution  (pie chart — always all-time, not date filtered)
# ──────────────────────────────────────────────────────────────────────────────

def get_user_distribution() -> list[dict]:
    """
    Role breakdown for the pie/donut chart.

    Returns data in Recharts shape: [{ name, value }]
    Only active users are counted.
    """
    rows = (
        User.objects.filter(is_active=True)
        .values("role")
        .annotate(value=Count("id"))
        .order_by("-value")
    )

    # Humanise the role key to a display label
    label_map = {
        UserRole.CITIZEN: "Citizen",
        UserRole.SOLVER: "Solver",
        UserRole.ADMIN: "Admin",
    }

    return [
        {"name": label_map.get(row["role"], row["role"].title()), "value": row["value"]}
        for row in rows
        if row["value"] > 0
    ]


# ──────────────────────────────────────────────────────────────────────────────
# Growth chart  (new user registrations over time)
# ──────────────────────────────────────────────────────────────────────────────

def _granularity(start_date, end_date):
    """
    Decides grouping granularity based on the date window.

    7d / 30d / <45 days  → day
    90d / custom ≥45d    → week
    1y                   → month
    """
    delta = (end_date - start_date).days
    if delta <= 44:
        return "day"
    if delta <= 180:
        return "week"
    return "month"


def get_user_growth(start_date, end_date) -> list[dict]:
    """
    New registrations grouped by day / week / month depending on range.

    Returns Recharts-ready list: [{ date: "Apr 01", users: N }]
    """
    granularity = _granularity(start_date, end_date)

    trunc_fn = {
        "day": TruncDate,
        "week": TruncWeek,
        "month": TruncMonth,
    }[granularity]

    fmt = {
        "day": "%b %d",       # Apr 01
        "week": "Wk %W %Y",   # Wk 14 2026
        "month": "%b %Y",     # Apr 2026
    }[granularity]

    rows = (
        User.objects.filter(
            created_at__date__gte=start_date,
            created_at__date__lte=end_date,
        )
        .annotate(period=trunc_fn("created_at"))
        .values("period")
        .annotate(users=Count("id"))
        .order_by("period")
    )

    return [
        {"date": row["period"].strftime(fmt), "users": row["users"]}
        for row in rows
    ]


# ──────────────────────────────────────────────────────────────────────────────
# Zone solver chart  (solvers per zone — grouped bar chart)
# ──────────────────────────────────────────────────────────────────────────────

def get_zone_solver_chart() -> list[dict]:
    """
    For each active zone, counts total solvers assigned to it and
    how many of those are active (is_active=True, last_login not null).

    Recharts shape: [{ zone, solvers, active_solvers }]

    Requires a Zone → Solver relationship. Assumes solvers have a
    ForeignKey or ManyToManyField to Zone named `zone` or `zones`.

    Adjust the field path below to match your actual Solver ↔ Zone model.
    e.g. if Solver has `zone = FK(Zone)`:  filter(role=SOLVER, zone=zone_obj)
         if User has `zones = M2M(Zone)`:  filter(role=SOLVER, zones=zone_obj)
    """
    zones = Zone.objects.filter(is_active=True).order_by("name")

    result = []
    for zone in zones:
        # ── adjust `zone` lookup to your actual field name ──
        solvers_qs = User.objects.filter(
            role=UserRole.SOLVER,
            profile__zone=zone,          # ← change to `zones=zone` if M2M
        )
        total = solvers_qs.count()
        active = solvers_qs.filter(is_active=True).count()

        # Skip zones with zero solvers — keeps the chart clean
        if total == 0:
            continue

        result.append({
            "zone": zone.name,
            "solvers": total,
            "active_solvers": active,
        })

    return result