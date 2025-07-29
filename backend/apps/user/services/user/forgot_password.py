from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from apps.user.models.user import User
from rest_framework.exceptions import ValidationError, NotFound
from django.conf import settings
from apps.user.utils.celery_task.reset_mail import send_reset_password_email_task


def initiate_password_reset(email: str):
    if not email:
        raise ValidationError("Email is required")

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        raise NotFound("User not found")

    uid = urlsafe_base64_encode(force_bytes(user.id))
    
    token = default_token_generator.make_token(user)
    reset_link = f"{settings.BACKEND_URL}/api/v1/user/reset-password/{uid}/{token}"
    # Send email in background
    send_reset_password_email_task.delay(user.email, reset_link)
    return reset_link

def reset_user_password(validated_data):
    user = validated_data['user']
    new_password = validated_data['new_password']
    user.set_password(new_password)
    user.save()
    return 
