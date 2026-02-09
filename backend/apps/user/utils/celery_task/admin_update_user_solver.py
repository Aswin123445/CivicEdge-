from celery import shared_task
from django.conf import settings
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives

@shared_task
def send_updatemessage_to_user_solver_admin_data_change(to_email: str, role: str):
    subject = "Your profile data has been updated by the admin"
    from_email = settings.DEFAULT_FROM_EMAIL

    # Render the email content from a template
    html_content = render_to_string("admin_update_message.html", {
        "role": role,
    })

    text_content = f"Hello,\n\nYour account information (role: {role}) was updated by the CivicEdge admin team. If you did not request these changes, please contact support immediately."

    # Create and send email
    email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
    email.attach_alternative(html_content, "text/html")
    email.send()
