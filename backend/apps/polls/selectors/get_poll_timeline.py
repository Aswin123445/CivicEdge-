from django.db.models import Count
from django.db.models.functions import TruncHour
from django.shortcuts import get_object_or_404

from apps.polls.models import Poll, PollVote


def get_poll_timeline(*, poll_id):
    poll = get_object_or_404(Poll, id=poll_id)

    timeline = (
        PollVote.objects
        .filter(poll=poll)
        .annotate(time_bucket=TruncHour("voted_at"))
        .values("time_bucket")
        .annotate(votes=Count("id"))
        .order_by("time_bucket")
    )

    return {
        "poll_id": str(poll.id),
        "question": poll.question,
        "timeline": [
            {
                "time": entry["time_bucket"],
                "votes": entry["votes"]
            }
            for entry in timeline
        ]
    }