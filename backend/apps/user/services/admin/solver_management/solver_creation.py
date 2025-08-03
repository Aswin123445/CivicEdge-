from django.contrib.auth import get_user_model
from apps.user.utils.celery_task.admin_solver_creation_notification import send_solver_welcome_email
from shared.enums.user_role import UserRole
from django.db import IntegrityError, transaction
from rest_framework.exceptions import ValidationError
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.exceptions import ValidationError as DRFValidationError
from rest_framework.exceptions import AuthenticationFailed
User = get_user_model()
def create_solver(validated_data: dict):
    name = validated_data.pop('name')
    password = validated_data.pop('password')
    email = validated_data.pop('email')
    try:
        with transaction.atomic():
            user = User.objects.create_user(
                email=email,
                password=password,
                role=UserRole.SOLVER,
                is_verified=True
            )
            if not user or not user.check_password(password):
                raise AuthenticationFailed("Invalid email or password.")
            # Check if profile is created via signal
            if not hasattr(user, "profile"):
                raise ValidationError("Profile was not created for the user.")
            user.profile.name = name
            user.profile.save()
            send_solver_welcome_email.delay(
                to_email = user.email,
                role = user.role,
                raw_password = password,
                username = name,
                login_path = "/api/v1/user/solver/login"           
            )
            return user

    except IntegrityError:
        # Duplicate email / unique constraint
        raise DRFValidationError({"email": ["User with this email already exists."]})
    except DjangoValidationError as e:
        # Model clean() errors or similar
        raise DRFValidationError(e.message_dict or e.messages)
    except Exception as e:
        # Fallback; avoid stringifying structured errors
        raise DRFValidationError({"detail": str(e)})
