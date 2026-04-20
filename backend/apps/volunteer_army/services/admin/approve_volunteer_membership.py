from apps.notification.services.dispatcher import NotificationDispatcher
from apps.notification.utils.event_constants import NotificationEvent
from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity


def approve_volunteer_membership(*, membership, by):
    membership.approve(by=by)
    NotificationDispatcher.dispatch(
        event=NotificationEvent.VOLUNTEER_JOIN_APPROVED,
        payload={
            "membership": membership,
            "actor": by
        }
    )
    create_activity(
        user=by,
        entity=ActivityEntity.GROUP,
        action=ActivityAction.UPDATED,
        message=f"You have approved the membership of {membership.user.profile.name if membership.user.profile.name else membership.user.email.split('@')[0]} ",
    )
    return membership