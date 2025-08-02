from celery import shared_task
from celery.utils.log import get_task_logger
from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives

logger = get_task_logger(__name__)

@shared_task
def send_solver_welcome_email(
    to_email: str,
    role: str,
    raw_password: str,
    username: str,
    login_path: str = "/login/"
):
    """
    Sends welcome email to a newly created solver/admin account with credentials.
    """
    try:
        subject = f"Welcome to CivicEdge as a {role.capitalize()} {username}"
        from_email = settings.DEFAULT_FROM_EMAIL

        # Build login URL (assuming you have a domain in settings)
        domain = getattr(settings, "BACKEND_URL", None) or getattr(settings, "SITE_DOMAIN", "")
        login_url = f"{domain.rstrip('/')}{login_path}"

        # Render HTML content
        html_content = render_to_string("solver_welcome.html", {
            "role": role,
            "email": to_email,
            "password": raw_password,
            "login_url": login_url,
        })

        # Plain-text fallback
        text_content = (
            f"Hello,\n\n"
            f"Your account has been created with role: {role}.\n"
            f"Login email: {to_email}\n"
            f"Password: {raw_password}\n\n"
            f"Please log in here: {login_url}\n\n"
            "For security, consider changing your password after first login.\n"
            "If you did not expect this email, contact support immediately."
        )

        email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
        email.attach_alternative(html_content, "text/html")
        email.send()
        logger.info("Sent welcome email to %s (role=%s)", to_email, role)
    except Exception as exc:
        logger.exception("Failed to send solver welcome email to %s", to_email)
