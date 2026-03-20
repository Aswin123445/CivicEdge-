from django.db import transaction

from apps.volunteer_army.models.event_participation import EventParticipation
from apps.volunteer_army.models.volunteer_recognition import RecognitionType, VolunteerRecognition
from apps.volunteer_army.selectors.admin.get_participation_for_certificate import certificate_already_exists, is_participation_eligible_for_certificate
from apps.volunteer_army.utils.build_certificate_payload import build_certificate_payload
from apps.volunteer_army.utils.generate_certificate_pdf import generate_certificate_pdf
from apps.volunteer_army.utils.send_certificate_email import send_certificate_email
from apps.volunteer_army.utils.upload_certificate_pdf_to_cloudinary import upload_certificate_pdf_to_cloudinary




@transaction.atomic
def issue_event_participation_certificate(*, participation_id):
    participation = (
        EventParticipation.objects.select_for_update()
        .select_related("event", "membership", "membership__user")
        .get(id=participation_id)
    )

    if not is_participation_eligible_for_certificate(participation=participation):
        return None

    if certificate_already_exists(participation=participation):
        return participation.recognition

    recognition = VolunteerRecognition.objects.create(
        participation=participation,
        user=participation.membership.user,
        event=participation.event,
        recognition_type=RecognitionType.CERTIFICATE,
        certificate_url="https://placeholder.local/pending",
        issued_by=None,
    )

    payload = build_certificate_payload(
        participation=participation,
        recognition=recognition,
    )

    pdf_bytes = generate_certificate_pdf(payload=payload)

    upload_result = upload_certificate_pdf_to_cloudinary(
        pdf_bytes=pdf_bytes,
        reference_id=recognition.reference_id,
    )

    recognition.certificate_url = upload_result["secure_url"]
    recognition.save(update_fields=["certificate_url", "updated_at"])

    send_certificate_email(
        to_email=participation.membership.user.email,
        user_name=payload["participant_name"],
        certificate_url=recognition.certificate_url,
        reference_id=recognition.reference_id,
        event_title=participation.event.title,
    )

    return recognition