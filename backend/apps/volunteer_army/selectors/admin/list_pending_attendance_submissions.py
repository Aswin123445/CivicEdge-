from apps.volunteer_army.models.event_participation import (
    EventParticipation,
    ParticipationStatus,
)


def list_pending_attendance_submissions():
    return (
        EventParticipation.objects.select_related(
            "event",
            "event__group",
            "membership",
            "membership__user",
            "verified_by",
        )
        .filter(status=ParticipationStatus.ATTENDANCE_SUBMITTED)
        .order_by("-attendance_submitted_at")
    )