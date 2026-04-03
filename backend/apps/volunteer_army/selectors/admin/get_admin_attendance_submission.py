from django.shortcuts import get_object_or_404

from apps.volunteer_army.models.event_participation import (
    EventParticipation,
    ParticipationStatus,
)


def get_admin_attendance_submission(*, attendance_id):
    return get_object_or_404(
        EventParticipation.objects.select_related(
            "event",
            "event__group",
            "membership",
            "membership__user",
            "verified_by",
        ),
        id=attendance_id,
        status=ParticipationStatus.ATTENDANCE_SUBMITTED ,
    )