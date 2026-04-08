from django.db.models import Exists, OuterRef, Count, Q
from apps.polls.models import Poll, PollVote
from apps.polls.models.polls import Status


def get_active_polls(user):
    user_votes_subquery = PollVote.objects.filter(
        poll=OuterRef("pk"),
        user=user
    )

    queryset = (
        Poll.objects.annotate(
            has_voted=Exists(user_votes_subquery),
            total_votes=Count("votes")
        )
        .filter(
            Q(status=Status.ACTIVE) | Q(has_voted=True)
        )
        .prefetch_related("options")
        .order_by("-created_at")
    )

    return queryset