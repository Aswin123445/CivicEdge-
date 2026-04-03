from celery import shared_task
from celery.utils.log import get_task_logger
from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives

logger = get_task_logger(__name__)


@shared_task
def send_certificate_email_task(
    *,
    to_email: str,
    user_name: str,
    certificate_url: str,
    reference_id: str,
    event_title: str,
):
    """
    Sends certificate email to citizen after successful generation.
    """
    try:
        subject = f"Your CivicEdge Certificate for {event_title} 🎉"
        from_email = settings.DEFAULT_FROM_EMAIL

        # Optional: base domain (for future links)
        domain = getattr(settings, "FRONTEND_URL", "") or getattr(settings, "SITE_DOMAIN", "")

        # -------------------------
        # HTML Email (Template)
        # -------------------------
        html_content = render_to_string("certificate_email.html", {
            "user_name": user_name,
            "event_title": event_title,
            "certificate_url": certificate_url,
            "reference_id": reference_id,
            "domain": domain,
        })

        # -------------------------
        # Plain Text Fallback
        # -------------------------
        text_content = (
            f"Hello {user_name},\n\n"
            f"Your participation certificate for '{event_title}' is ready.\n\n"
            f"Certificate ID: {reference_id}\n"
            f"View certificate: {certificate_url}\n\n"
            f"Thank you for your contribution.\n"
            f"CivicEdge Team"
        )

        # -------------------------
        # Send Email
        # -------------------------
        email = EmailMultiAlternatives(
            subject,
            text_content,
            from_email,
            [to_email],
        )

        email.attach_alternative(html_content, "text/html")
        email.send()

        logger.info("Certificate email sent to %s (ref=%s)", to_email, reference_id)

    except Exception:
        logger.exception("Failed to send certificate email to %s", to_email)
        raise