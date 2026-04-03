from apps.volunteer_army.models.event_participation import EventParticipation
from django.utils import timezone


def list_user_event_participations(*, user, on_status):
    now = timezone.now()
    parcipations = (
        EventParticipation.objects.select_related(
            "event",
            "event__group",
            "membership",
            "membership__user",
        )
        .filter(membership__user=user)
        .order_by("-registered_at")
    )
    if on_status == 'upcoming':
        parcipations = parcipations.filter(event__start_time__gt=now)

    elif on_status == 'completed':
        parcipations = parcipations.filter(event__end_time__lt=now)

    elif on_status == 'live':
        parcipations = parcipations.filter(
            event__start_time__lte=now,
            event__end_time__gte=now
        )

    return parcipations 