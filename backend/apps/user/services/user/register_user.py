from apps.user.models.user import User
from apps.user.tasks import send_verification_email_task
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.exceptions import ValidationError as DRFValidationError

def register_user(data: dict) -> User:
    """
    Handles user creation and any additional logic like notifications, analytics, etc.
    """
    try:
       user = User.objects.create_user(**data)
    except DjangoValidationError as e:
        raise DRFValidationError(e.message_dict)
    try:
        send_verification_email_task.delay(user.id)
    except Exception:
        # log the failure, don't crash registration
        pass
    return user