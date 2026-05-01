from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity
from apps.notification.services.dispatcher import NotificationDispatcher
from apps.notification.utils.event_constants import NotificationEvent


def publish_volunteer_event(*, event, by):
    event.publish(by=by)
    create_activity(
        user=by,
        entity=ActivityEntity.EVENT,
        action=ActivityAction.UPDATED,
        message=f"You have published the event {event.title}",
    )
    NotificationDispatcher.dispatch(
        event=NotificationEvent.VOLUNTEER_EVENTS_NOTIFY,
        payload={"event": event, "actor": by},
    )
    return event
