from apps.user.models.user import User
from apps.user.tasks import send_verification_email_task


def register_user(data: dict) -> User:
    """
    Handles user creation and any additional logic like notifications, analytics, etc.
    """
    user = User.objects.create_user(**data)

    try:
        send_verification_email_task.delay(user.id)
    except Exception:
        # log the failure, don't crash registration
        pass
    return user