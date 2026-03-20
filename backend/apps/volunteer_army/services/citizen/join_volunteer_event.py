from apps.volunteer_army.models.event_participation import EventParticipation


def join_volunteer_event(*, event, membership):
    return EventParticipation.join_event(
        event=event,
        membership=membership,
    )