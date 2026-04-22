from django.db.models import Count
from django.utils.timezone import now

from apps.polls.models import Poll, PollOption, PollVote
from apps.polls.models.polls import Status

def get_home_polls(limit=2):
    total_active_polls = Poll.objects.filter(
        status=Status.ACTIVE,
        expires_at__gt = now()
    ).count()
    current_time = now()

    total_system_votes = PollVote.objects.count()

    polls = (
        Poll.objects
        .filter(status=Status.ACTIVE)
        .order_by("-created_at")[:limit]
    )

    result = []

    for poll in polls:
        options = (
            PollOption.objects
            .filter(poll=poll)
            .annotate(vote_count=Count("votes"))
        )

        total_votes = sum(opt.vote_count for opt in options)

        leading_percent = 0
        if total_votes > 0:
            leading_option = max(options, key=lambda x: x.vote_count, default=None)
            if leading_option:
                leading_percent = (leading_option.vote_count / total_votes) * 100

        time_left = None
        if poll.expires_at:
            delta = poll.expires_at - current_time
            if delta.total_seconds() <= 0:
                time_left = "Expired"
            elif delta.days > 0:
                time_left = f"{delta.days} days left"
            else:
                hours = delta.seconds // 3600 
                time_left = f"{hours} hours left"

        status = "Active"

        if poll.expires_at:
            remaining = poll.expires_at - current_time

            if remaining.total_seconds() <= 0:
                status = "Expired"
            elif remaining.days <= 1:
                status = "Closing Soon"

        result.append({
            "id": poll.id,
            "question": poll.question,
            "description": poll.context,
            "votes": total_votes,
            "leading_percent": round(leading_percent, 1),
            "timeLeft": time_left,
            "status": status,
        })

    return {
        "total_system_votes": total_system_votes,
        "polls": result,
        "total_active_polls": total_active_polls

    }