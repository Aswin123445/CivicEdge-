from apps.notification.services.dispatcher import NotificationDispatcher
from apps.notification.utils.event_constants import NotificationEvent


def reject_attendance_submission(*, participation, by):
    participation.reject(by=by)
    NotificationDispatcher.dispatch(
        event=NotificationEvent.VOLUNTEER_ATTENDANCE_REJECT,
        payload={"parcipation": participation, "actor": by},
    )
    return participation
