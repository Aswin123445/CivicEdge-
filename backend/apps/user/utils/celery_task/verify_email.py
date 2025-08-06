# users/tasks.py
from celery import shared_task
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from apps.user.models.user import User
from apps.user.utils.jwt.jwt import create_access_token

@shared_task
def send_verification_email_task(user_id):
    try:
        user = User.objects.get(id=user_id)
        user_data = {
            "user_id": str(user.id),
            "email": user.email,
            "role": user.role,  
}
        token = create_access_token(user_data,expires_at=5)  # Token valid for 5 minutes
        # verification_link = f"{settings.FRONTEND_URL}/verify-email?token={token}"
        verification_link = f"{settings.FRONTEND_URL}verify-email?token={token}"
        subject = "CivicEdge - Email Verification for acount activation"
        html_message = render_to_string("user_verification.html", {
            "user": user,
            "verification_link": verification_link,
        })

        send_mail(
            subject=subject,
            message="verify your email",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            html_message=html_message
        )
    except User.DoesNotExist:
        pass
