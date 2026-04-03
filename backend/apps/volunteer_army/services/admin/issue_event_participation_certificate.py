from django.db import transaction

from apps.volunteer_army.models.volunteer_recognition import RecognitionStatus, RecognitionType, VolunteerRecognition
from apps.volunteer_army.selectors.admin.get_participation_for_certificate import certificate_already_exists, is_participation_eligible_for_certificate
from apps.volunteer_army.models.event_participation import EventParticipation

@transaction.atomic
def create_event_certificate_recognition(*, participation_id):
    participation = (
        EventParticipation.objects.select_for_update()
        .select_related("event", "membership", "membership__user")
        .get(id=participation_id)
    )

    if not is_participation_eligible_for_certificate(participation=participation):
        return None

    if certificate_already_exists(participation=participation):
        return participation.recognition.id

    recognition = VolunteerRecognition.objects.create(
        participation=participation,
        user=participation.membership.user,
        event=participation.event,
        recognition_type=RecognitionType.EVENT_PARTICIPATION_CERTIFICATE,
        certificate_url=None,
        issued_by=None,
        status=  RecognitionStatus.PENDING
    )

    return recognition.id