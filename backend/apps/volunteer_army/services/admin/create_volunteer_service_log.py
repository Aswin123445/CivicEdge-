from rest_framework.exceptions import ValidationError

from apps.volunteer_army.models.event_participation import ParticipationStatus
from apps.volunteer_army.models.volunteer_service_log import VolunteerServiceLog


def create_volunteer_service_log(*, participation, service_hours, description, by):
    if not by.is_staff:
        raise ValidationError("Only admin can create service logs.")

    if participation.status != ParticipationStatus.VERIFIED:
        raise ValidationError("Service log can only be created for verified participation.")

    if VolunteerServiceLog.objects.filter(participation=participation).exists():
        raise ValidationError("Service log already exists for this participation.")

    service_log = VolunteerServiceLog.objects.create(
        participation=participation,
        user=participation.membership.user,
        event=participation.event,
        service_hours=service_hours,
        description=description,
        logged_by=by,
    )

    return service_log