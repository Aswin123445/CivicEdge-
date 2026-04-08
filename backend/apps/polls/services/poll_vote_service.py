from django.db import transaction
from rest_framework.exceptions import ValidationError

from apps.polls.models import Poll, PollOption, PollVote
from apps.polls.selectors.get_poll_results import get_poll_results


@transaction.atomic
def vote_on_poll(*, user, poll_id, option_id):
    # 1. Fetch poll
    try:
        poll = Poll.objects.get(id=poll_id)
    except Poll.DoesNotExist:
        raise ValidationError("Poll not found")

    # 2. Validate poll state
    if not poll.is_active:
        raise ValidationError("Poll is not active")
    if poll.effective_status != "active":
        raise ValidationError("Poll has expired")

    # 3. Check if already voted
    existing_vote = PollVote.objects.filter(
        poll=poll,
        user=user
    ).first()

    if existing_vote:
        results, total_votes = get_poll_results(poll)

        return {
            "already_voted": True,
            "results": results,
            "total_votes": total_votes,
            "did_you_know": poll.did_you_know,
        }

    # 4. Validate option
    try:
        option = PollOption.objects.get(id=option_id, poll=poll)

    except PollOption.DoesNotExist:
        raise ValidationError("Invalid option")

    # 5. Create vote (DB constraint ensures safety)
    PollVote.objects.create(
        poll=poll,
        option=option,
        user=user
    )

    # 6. Compute results
    results, total_votes = get_poll_results(poll)

    return {
        "already_voted": False,
        "results": results,
        "total_votes": total_votes,
        "did_you_know": poll.did_you_know,
    }