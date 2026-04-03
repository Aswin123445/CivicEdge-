from decimal import Decimal

from django.db import transaction
from rest_framework.exceptions import ValidationError

from apps.volunteer_army.models.volunteer_service_log import VolunteerServiceLog
from apps.volunteer_army.utils.celery_task.create_event_certificate_recognition import maybe_generate_event_certificate_task


@transaction.atomic
def approve_attendance_submission(*, participation, by):
    if hasattr(participation, "service_log"):
        raise ValidationError("Service log already exists for this participation.")

    participation.verify(by=by)

    duration_seconds = (
        participation.event.end_time - participation.event.start_time
    ).total_seconds()
    service_hours = Decimal(str(duration_seconds / 3600)).quantize(Decimal("0.01"))

    VolunteerServiceLog.objects.create(
        participation=participation,
        user=participation.membership.user,
        event=participation.event,
        service_hours=service_hours,
        description=(
            f"Service recorded automatically from verified attendance "
            f"for event: {participation.event.title}"
        ),
        logged_by=by,
    )
    participation_id = participation.id
    transaction.on_commit(
        lambda: maybe_generate_event_certificate_task.delay(participation_id)
    )

    return participation


