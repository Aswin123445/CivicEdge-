from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity


def leave_volunteer_event_participation(*, participation, by):
    participation.leave(by=by)
    create_activity(
        user=by,
        entity=ActivityEntity.EVENT,
        action=ActivityAction.CLOSED,
        message=f"You have left the event {participation.event.title}",
    )
    return participation