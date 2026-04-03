# tasks/generate_certificate_task.py

from celery import shared_task
import logging

from apps.volunteer_army.models.volunteer_recognition import VolunteerRecognition
from apps.volunteer_army.utils.build_certificate_payload import build_certificate_payload
from apps.volunteer_army.utils.generate_certificate_pdf import generate_certificate_pdf
from apps.volunteer_army.utils.celery_task.send_certificate_email import send_certificate_email_task
from apps.volunteer_army.utils.upload_certificate_pdf_to_cloudinary import CertificateService



logger = logging.getLogger(__name__)


@shared_task(bind=True, autoretry_for=(Exception,), retry_backoff=True, max_retries=3)
def generate_certificate_task(self, recognition_id):
    try:
        recognition = VolunteerRecognition.objects.select_related(
            "participation__event",
            "participation__membership__user"
        ).get(id=recognition_id)

        # Prevent duplicate processing
        if recognition.certificate_url:
            logger.info(f"Certificate already generated for {recognition_id}")
            return

        participation = recognition.participation

        payload = build_certificate_payload(
            participation=participation,
            recognition=recognition,
        )

        pdf_bytes = generate_certificate_pdf(payload=payload)

        url = CertificateService.upload_certificate(
            pdf_bytes=pdf_bytes,
            reference_id=recognition.reference_id,
        )

        recognition.certificate_url = url
        recognition.status = "GENERATED"
        recognition.save(update_fields=["certificate_url", "status", "updated_at"])

        # 5️⃣ Send Email
        send_certificate_email_task.delay(
            to_email=participation.membership.user.email,
            user_name=payload["participant_name"],
            certificate_url=recognition.certificate_url,
            reference_id=recognition.reference_id,
            event_title=participation.event.title,
        )

        logger.info(f"Certificate generated successfully for {recognition_id}")

    except Exception as e:
        logger.error(f"Certificate generation failed for {recognition_id}: {str(e)}")

        # Mark as failed
        VolunteerRecognition.objects.filter(id=recognition_id).update(
            status="FAILED"
        )

        raise self.retry(exc=e)