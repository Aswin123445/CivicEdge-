from django.utils.timezone import now
from rest_framework.exceptions import ValidationError

from apps.polls.models.polls import Status
from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity


def close_poll(*, poll, user):
    #  Already closed
    if poll.status == Status.CLOSED:
        raise ValidationError("Poll is already closed")

    #  Already expired (optional rule)
    if poll.expires_at and poll.expires_at < now():
        raise ValidationError("Poll already expired")

    poll.status = Status.CLOSED
    poll.save(update_fields=["status"])
    create_activity(
        user=user,
        entity=ActivityEntity.POLL,
        action=ActivityAction.CLOSED,
        message=f"poll {poll.question} closed",
    )

    return poll