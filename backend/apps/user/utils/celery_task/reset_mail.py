from celery import shared_task
from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives

@shared_task
def send_reset_password_email_task(to_email: str, reset_link: str):
    subject = "CivicEdge password forgot password reset link"
    from_email = settings.DEFAULT_FROM_EMAIL

    # Render the email content from a template
    html_content = render_to_string("forgot_password.html", {
        "reset_link": reset_link,
    })
    text_content = f"Reset your password using this link: {reset_link}"  
    # Create the email object
    email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
    email.attach_alternative(html_content, "text/html")
    email.send()