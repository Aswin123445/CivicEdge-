from django.db.models import Count
from apps.polls.models import PollOption


def get_poll_results(poll):
    options = (
        PollOption.objects.filter(poll=poll)
        .annotate(vote_count=Count("votes"))
        .order_by("order")
    )

    total_votes = sum(opt.vote_count for opt in options)

    results = [
        {
            "option_id": str(opt.id),
            "text": opt.option_text,
            "vote_count": opt.vote_count,
            "percent": (
                (opt.vote_count / total_votes * 100)
                if total_votes > 0 else 0
            ),
        }
        for opt in options
    ]

    return results, total_votes