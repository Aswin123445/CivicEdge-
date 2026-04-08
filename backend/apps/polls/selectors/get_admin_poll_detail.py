from django.db.models import Count
from django.shortcuts import get_object_or_404

from apps.polls.models import Poll, PollOption


def get_admin_poll_detail(*, poll_id):
    poll = get_object_or_404(
        Poll.objects.prefetch_related("options"),
        id=poll_id
    )

    options = (
        PollOption.objects
        .filter(poll=poll)
        .annotate(vote_count=Count("votes"))
        .order_by("order")
    )

    total_votes = sum(opt.vote_count for opt in options)

    results = [
        {
            "option_id": str(opt.id),
            "label": opt.option_text,
            "value": opt.vote_count,
            "percent": (
                (opt.vote_count / total_votes * 100)
                if total_votes > 0 else 0
            ),
        }
        for opt in options
    ]

    return poll, results, total_votes