from celery import shared_task
from celery.utils.log import get_task_logger

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


logger = get_task_logger(__name__)


@shared_task
def send_issue_resolved_email(
    to_email: str,
    issue_title: str,
    issue_description: str,
    resolved_message: str,
):
    """
    Notify user that their issue has been resolved.
    Template only needs:
    - issue title
    - issue description
    - resolved message
    """

    try:
        subject = f"Your issue has been resolved - {issue_title}"
        from_email = settings.DEFAULT_FROM_EMAIL

        html_content = render_to_string(
            "issue_resolved.html",
            {
                "issue_title": issue_title,
                "issue_description": issue_description,
                "resolved_message": resolved_message,
            },
        )

        text_content = (
            f"Your reported issue has been resolved.\n\n"
            f"Title: {issue_title}\n"
            f"Description: {issue_description}\n\n"
            f"Resolution Message:\n{resolved_message}"
        )

        email = EmailMultiAlternatives(
            subject,
            text_content,
            from_email,
            [to_email],
        )

        email.attach_alternative(html_content, "text/html")
        email.send()

        logger.info("Issue resolved email sent to %s", to_email)

    except Exception:
        logger.exception(
            "Failed to send issue resolved email to %s",
            to_email,
        )
