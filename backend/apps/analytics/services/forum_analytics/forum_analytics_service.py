from datetime import date

from apps.analytics.selectors.forum_analytics.forum_analytics_selector import (
    get_comment_count,
    get_forum_activity_trend,
    get_moderation_action_count,
    get_post_count,
    get_top_discussion_categories,
)


def _safe_change_percent(current: float, previous: float) -> float:
    if not previous:
        return 0.0
    return round(((current - previous) / previous) * 100, 1)


def _build_kpi(key: str, label: str, current: float, previous: float) -> dict:
    change = _safe_change_percent(current, previous)
    return {
        "key": key,
        "label": label,
        "value": current,
        "change_percent": change,
        "isPositive": change >= 0,
    }


def get_forum_analytics_data(
    *,
    current_start: date,
    current_end: date,
    previous_start: date,
    previous_end: date,
    top_categories_limit: int = 5,
) -> dict:

    # ------------------------------------------------------------------ #
    # Raw KPI values — current vs previous window
    # ------------------------------------------------------------------ #
    posts_current = get_post_count(start_date=current_start, end_date=current_end)
    posts_previous = get_post_count(start_date=previous_start, end_date=previous_end)

    comments_current = get_comment_count(start_date=current_start, end_date=current_end)
    comments_previous = get_comment_count(
        start_date=previous_start, end_date=previous_end
    )

    mod_current = get_moderation_action_count(
        start_date=current_start, end_date=current_end
    )
    mod_previous = get_moderation_action_count(
        start_date=previous_start, end_date=previous_end
    )

    # ------------------------------------------------------------------ #
    # KPIs — note: moderation going DOWN is positive (isPositive flipped)
    # ------------------------------------------------------------------ #
    mod_change = _safe_change_percent(mod_current, mod_previous)

    kpis = [
        _build_kpi("total_posts", "Total Posts", posts_current, posts_previous),
        _build_kpi(
            "total_comments", "Total Comments", comments_current, comments_previous
        ),
        {
            "key": "moderation_actions",
            "label": "Moderation Actions",
            "value": mod_current,
            "change_percent": mod_change,
            "isPositive": mod_change <= 0,  # fewer mod actions = good
        },
    ]

    # ------------------------------------------------------------------ #
    # Trend
    # ------------------------------------------------------------------ #
    forum_activity_trend = get_forum_activity_trend(
        start_date=current_start,
        end_date=current_end,
    )

    # ------------------------------------------------------------------ #
    # Top categories
    # ------------------------------------------------------------------ #
    raw_categories = get_top_discussion_categories(
        start_date=current_start,
        end_date=current_end,
        limit=top_categories_limit,
    )
    top_discussion_categories = [
        {"name": row["category__name"], "count": row["count"]} for row in raw_categories
    ]

    return {
        "kpis": kpis,
        "forum_activity_trend": forum_activity_trend,
        "top_discussion_categories": top_discussion_categories,
    }
