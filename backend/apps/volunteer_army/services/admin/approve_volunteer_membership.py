from apps.notification.services.dispatcher import NotificationDispatcher
from apps.notification.utils.event_constants import NotificationEvent


def approve_volunteer_membership(*, membership, by):
    membership.approve(by=by)
    NotificationDispatcher.dispatch(
        event=NotificationEvent.VOLUNTEER_JOIN_APPROVED,
        payload={
            "membership": membership,
            "actor": by
        }
    )
    return membership