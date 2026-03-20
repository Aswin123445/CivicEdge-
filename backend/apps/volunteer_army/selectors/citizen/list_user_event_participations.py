from apps.volunteer_army.models.event_participation import EventParticipation


def list_user_event_participations(*, user):
    return (
        EventParticipation.objects.select_related(
            "event",
            "event__group",
            "membership",
            "membership__user",
        )
        .filter(membership__user=user)
        .order_by("-registered_at")
    )