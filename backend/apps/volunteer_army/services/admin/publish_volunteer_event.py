from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity


def publish_volunteer_event(*, event, by):
    event.publish(by=by)
    create_activity(
        user=by,
        entity=ActivityEntity.EVENT,
        action=ActivityAction.UPDATED,
        message=f"You have published the event {event.title}",
    )
    return event