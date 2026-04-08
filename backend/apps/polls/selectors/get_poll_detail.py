from django.db.models import Exists, OuterRef, Count
from django.shortcuts import get_object_or_404

from apps.polls.models import Poll, PollVote, PollOption


def get_poll_detail(*, poll_id, user):
    user_vote_subquery = PollVote.objects.filter(
        poll=OuterRef("pk"),
        user=user
    )

    poll = get_object_or_404(
        Poll.objects.annotate(
            has_voted=Exists(user_vote_subquery)
        ).prefetch_related("options"),
        id=poll_id
    )

    results = None
    total_votes = None
    user_choice = None

    if poll.has_voted:
        options = (
            PollOption.objects.filter(poll=poll)
            .annotate(vote_count=Count("votes"))
            .order_by("order")
        )

        total_votes = sum(opt.vote_count for opt in options)

        results = [
            {
                "option_id": str(opt.id),
                "label": opt.option_text, 
                "votes": opt.vote_count,    
                "percent": (
                    (opt.vote_count / total_votes * 100)
                    if total_votes > 0 else 0
                ),
            }
            for opt in options
        ]
        vote = (
            PollVote.objects
            .filter(poll=poll, user=user)
            .select_related("option")
            .first()
        )

        if vote:
            user_choice = {
                "option_id": str(vote.option.id),
                "label": vote.option.option_text
            }

    return poll, results, total_votes, user_choice