from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity


def cancel_volunteer_event(*, event, by):
    event.cancel(by=by)
    create_activity(
        user=by,
        entity=ActivityEntity.EVENT,
        action=ActivityAction.CLOSED,
        message=f"You have cancelled the event {event.title}",
    )
    return event