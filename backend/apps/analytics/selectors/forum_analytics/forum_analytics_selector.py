
from django.db.models import Count
from django.db.models.functions import TruncDate

from apps.forum.models.forum_comment import CommentStatus, ForumComment
from apps.forum.models.forum_post import ForumPost, PostStatus
from apps.forum.models.forum_report import ForumReport



def _date_filter(qs, field: str, start_date=None, end_date=None):
    if start_date:
        qs = qs.filter(**{f"{field}__date__gte": start_date})
    if end_date:
        qs = qs.filter(**{f"{field}__date__lte": end_date})
    return qs


# ------------------------------------------------------------------ #
# KPI selectors
# ------------------------------------------------------------------ #

def get_post_count(*, start_date=None, end_date=None) -> int:
    qs = ForumPost.objects.all()
    return _date_filter(qs, "created_at", start_date, end_date).count()


def get_comment_count(*, start_date=None, end_date=None) -> int:
    qs = ForumComment.objects.all()
    return _date_filter(qs, "created_at", start_date, end_date).count()


def get_moderation_action_count(*, start_date=None, end_date=None) -> int:
    """
    Moderation actions = posts/comments with status HIDDEN or REMOVED
    + reports with status REVIEWED, RESOLVED, or REJECTED.
    """
    hidden_posts = _date_filter(
        ForumPost.objects.filter(status__in=[PostStatus.HIDDEN, PostStatus.REMOVED]),
        "updated_at", start_date, end_date,
    ).count()

    hidden_comments = _date_filter(
        ForumComment.objects.filter(status__in=[CommentStatus.HIDDEN, CommentStatus.REMOVED]),
        "updated_at", start_date, end_date,
    ).count()

    resolved_reports = _date_filter(
        ForumReport.objects.filter(
            status__in=["reviewed", "resolved", "rejected"]
        ),
        "created_at", start_date, end_date,
    ).count()

    return hidden_posts + hidden_comments + resolved_reports


# ------------------------------------------------------------------ #
# Trend selector
# ------------------------------------------------------------------ #

def get_forum_activity_trend(*, start_date, end_date) -> list[dict]:
    """
    Single-pass query using conditional annotation.
    Handles both datetime and date objects for start/end.
    """
    # Normalize to date if datetime was passed in
    if hasattr(start_date, 'date'):
        start_date = start_date.date()
    if hasattr(end_date, 'date'):
        end_date = end_date.date()

    # Posts per day
    posts_by_day = (
        ForumPost.objects.filter(
            created_at__date__gte=start_date,
            created_at__date__lte=end_date,
        )
        .annotate(day=TruncDate("created_at"))
        .values("day")
        .annotate(posts=Count("id"))
    )

    # Comments per day
    comments_by_day = (
        ForumComment.objects.filter(
            created_at__date__gte=start_date,
            created_at__date__lte=end_date,
        )
        .annotate(day=TruncDate("created_at"))
        .values("day")
        .annotate(comments=Count("id"))
    )

    # Merge
    trend_map: dict = {}
    for row in posts_by_day:
        trend_map.setdefault(row["day"], {"posts": 0, "comments": 0})
        trend_map[row["day"]]["posts"] = row["posts"]

    for row in comments_by_day:
        trend_map.setdefault(row["day"], {"posts": 0, "comments": 0})
        trend_map[row["day"]]["comments"] = row["comments"]

    return [
        {
            "date": f"{day.strftime('%b')} {day.day}",
            "posts": values["posts"],
            "comments": values["comments"],
        }
        for day, values in sorted(trend_map.items())
    ]

# ------------------------------------------------------------------ #
# Category selector
# ------------------------------------------------------------------ #

def get_top_discussion_categories(
    *, start_date=None, end_date=None, limit: int = 5
) -> list[dict]:
    qs = ForumPost.objects.all()
    qs = _date_filter(qs, "created_at", start_date, end_date)

    return (
        qs.values("category__name")
        .annotate(count=Count("id"))
        .order_by("-count")[:limit]
        .values("category__name", "count")
    )