from apps.volunteer_army.models.event_participation import EventParticipation
from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity


def join_volunteer_event(*, event, membership):
    parcipation =  EventParticipation.join_event(
        event=event,
        membership=membership,
    )
    create_activity(
        user=membership.user,
        entity=ActivityEntity.EVENT,
        action=ActivityAction.JOINED,
        message=f"You have joined the event {parcipation.event.title}",
    )
    return parcipation