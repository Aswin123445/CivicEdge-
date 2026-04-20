from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity


def leave_membership(*, membership, user):

    membership.leave(by=user)
    create_activity(
        user=user,
        entity=ActivityEntity.GROUP,
        action=ActivityAction.CLOSED,
        message=f"You have left the group {membership.group.name}",
    )
    return membership