from django.shortcuts import get_object_or_404

from apps.volunteer_army.models.event_participation import EventParticipation


def get_user_event_participation(*, participation_id, user):
    return get_object_or_404(
        EventParticipation.objects.select_related(
            "event", "event__group", "membership", "membership__user", "verified_by"
        ),
        id=participation_id,
        membership__user=user,
    )
