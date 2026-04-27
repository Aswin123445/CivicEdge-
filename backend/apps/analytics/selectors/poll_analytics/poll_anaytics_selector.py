from django.db.models import Count, Q
from django.db.models.functions import TruncDate
from datetime import date
from apps.polls.models.poll_vote import PollVote
from apps.polls.models.polls import Poll



def _date_filter(qs, field: str, start_date=None, end_date=None):
    """Applies __date__gte / __date__lte filters generically."""
    if start_date:
        qs = qs.filter(**{f"{field}__date__gte": start_date})
    if end_date:
        qs = qs.filter(**{f"{field}__date__lte": end_date})
    return qs
 
 
def get_poll_count(*, start_date=None, end_date=None) -> int:
    return _date_filter(Poll.objects.all(), "created_at", start_date, end_date).count()
 
 
def get_vote_count(*, start_date=None, end_date=None) -> int:
    return _date_filter(PollVote.objects.all(), "voted_at", start_date, end_date).count()
 
 
def get_unique_voter_count(*, start_date=None, end_date=None) -> int:
    qs = _date_filter(PollVote.objects.all(), "voted_at", start_date, end_date)
    return qs.values("user").distinct().count()
 
 
def get_total_user_count() -> int:
    from django.contrib.auth import get_user_model
    return get_user_model().objects.filter(is_active=True).count()
 
 
def get_participation_trend(*, start_date: date, end_date: date) -> list[dict]:
    votes_by_day = (
        PollVote.objects.filter(
            voted_at__date__gte=start_date,
            voted_at__date__lte=end_date,
        )
        .annotate(day=TruncDate("voted_at"))
        .values("day")
        .annotate(
            votes=Count("id"),
            voters=Count("user", distinct=True),
        )
        .order_by("day")
    )
 
    active_polls_by_day = (
        Poll.objects.filter(created_at__date__lte=end_date)
        .filter(Q(expires_at__isnull=True) | Q(expires_at__date__gte=start_date))
        .annotate(day=TruncDate("created_at"))
        .values("day")
        .annotate(active_polls=Count("id"))
    )
    active_polls_map = {row["day"]: row["active_polls"] for row in active_polls_by_day}
 
    return [
        {
            "date": row["day"].isoformat(),
            "votes": row["votes"],
            "voters": row["voters"],
            "active_polls": active_polls_map.get(row["day"], 0),
        }
        for row in votes_by_day
    ]
 
 
def get_top_polls(*, limit: int = 10, start_date=None, end_date=None) -> list[dict]:
    vote_qs = PollVote.objects.all()
    vote_qs = _date_filter(vote_qs, "voted_at", start_date, end_date)
 
    # Filter polls that have at least one vote in the window
    poll_ids_in_range = vote_qs.values_list("poll_id", flat=True).distinct()
 
    return (
        Poll.objects.filter(id__in=poll_ids_in_range)
        .annotate(
            votes_ano=Count(
                "votes",
                filter=Q(
                    **({} if not start_date else {"votes__voted_at__date__gte": start_date}),
                    **({} if not end_date else {"votes__voted_at__date__lte": end_date}),
                ),
            ),
            unique_participants=Count(
                "votes__user",
                distinct=True,
                filter=Q(
                    **({} if not start_date else {"votes__voted_at__date__gte": start_date}),
                    **({} if not end_date else {"votes__voted_at__date__lte": end_date}),
                ),
            ),
        )
        .order_by("-votes_ano")[:limit]
        .values("reference_id", "question", "status", "votes_ano", "unique_participants")
    )
