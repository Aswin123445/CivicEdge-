from django.core.mail import send_mail


def send_certificate_email(*, to_email, user_name, certificate_url, reference_id, event_title):
    subject = "Your CivicEdge Volunteer Participation Certificate"
    message = (
        f"Hello {user_name},\n\n"
        f"Your volunteer participation certificate for '{event_title}' is ready.\n"
        f"Certificate ID: {reference_id}\n"
        f"View certificate: {certificate_url}\n\n"
        f"Thank you for your contribution.\n"
        f"CivicEdge"
    )

    send_mail(
        subject=subject,
        message=message,
        from_email=None,
        recipient_list=[to_email],
        fail_silently=False,
    )