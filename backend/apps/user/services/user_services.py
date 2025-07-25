from apps.user.models.user import User,Profile
from apps.user.tasks import send_verification_email_task
from apps.user.utils.jwt.jwt import decode_access_token
from django.core.exceptions import ObjectDoesNotExist
from shared.exceptions.custom_exceptions import InvalidTokenError, UserAlreadyExistsError, UserNotFoundError
from django.core.exceptions import ObjectDoesNotExist
from apps.user.models import User
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




def verify_user_email_from_token(token: str):
    user_data = decode_access_token(token)  # This already raises appropriate exceptions

    user_id = user_data.get("user_id")
    if not user_id:
        raise InvalidTokenError("Invalid token payload — user_id missing")

    try:
        user = User.objects.get(id=user_id)
    except ObjectDoesNotExist:
        raise UserNotFoundError("User does not exist")

    if not user.is_verified:
        user.is_verified = True
        user.save()
    else:
        raise UserAlreadyExistsError("User already verifided please login")
    
    if not hasattr(user, "profile"):
        Profile.objects.create(user=user, name=user.email.split('@')[0]) 

    
    return user