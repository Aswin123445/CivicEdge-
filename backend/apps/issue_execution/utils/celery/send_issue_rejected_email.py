# tasks.py

from celery import shared_task
from celery.utils.log import get_task_logger

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


logger = get_task_logger(__name__)


@shared_task
def send_issue_rejected_email(
    to_email: str,
    issue_title: str,
    issue_description: str,
    rejection_message: str,
):
    """
    Notify user that their reported issue was rejected / closed
    after review.
    """

    try:
        subject = f"Issue Update - {issue_title}"
        from_email = settings.DEFAULT_FROM_EMAIL

        html_content = render_to_string(
            "issue_rejected.html",
            {
                "issue_title": issue_title,
                "issue_description": issue_description,
                "rejection_message": rejection_message,
            },
        )

        text_content = (
            f"Your reported issue has been reviewed.\n\n"
            f"Title: {issue_title}\n"
            f"Description: {issue_description}\n\n"
            f"Update Message:\n{rejection_message}"
        )

        email = EmailMultiAlternatives(
            subject,
            text_content,
            from_email,
            [to_email],
        )

        email.attach_alternative(html_content, "text/html")
        email.send()

        logger.info("Issue rejected email sent to %s", to_email)

    except Exception:
        logger.exception(
            "Failed to send issue rejected email to %s",
            to_email,
        )
