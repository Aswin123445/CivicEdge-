


from apps.volunteer_army.models.event_participation import EventParticipation, ParticipationStatus
from apps.volunteer_army.models.volunteer_recognition import RecognitionType, VolunteerRecognition


def is_participation_eligible_for_certificate(*, participation) -> bool:
    if participation.event.get_runtime_status() != 'COMPLETED':
        return False

    if participation.status != ParticipationStatus.VERIFIED:
        return False

    return True


def certificate_already_exists(*, participation) -> bool:
    return VolunteerRecognition.objects.filter(
        participation=participation,
        recognition_type=RecognitionType.CERTIFICATE,
    ).exists()
    


def get_participation_for_certificate(*, participation_id):
    try:
        return (
            EventParticipation.objects.select_related(
                "event",
                "membership",
                "membership__user",
            ).get(id=participation_id)
        )
    except EventParticipation.DoesNotExist:
        return None