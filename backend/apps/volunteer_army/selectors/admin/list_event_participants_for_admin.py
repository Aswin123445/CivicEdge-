from apps.volunteer_army.models.event_participation import EventParticipation


def list_event_participants_for_admin(*, event_id):
    return (
        EventParticipation.objects.select_related(
            "event",
            "event__group",
            "membership",
            "membership__user",
            "verified_by",
        )
        .filter(event_id=event_id)
        .order_by("-registered_at")
    )