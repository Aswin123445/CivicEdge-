
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import update_last_login
import logging

logger = logging.getLogger(__name__)

def generate_refresh_access_token(data):
    """
    Generate access and refresh JWT tokens for a given user.

    Args:
        data (dict): A dictionary that must contain the 'user' key, representing the authenticated user instance.

    Returns:
        dict: A dictionary with the following keys:
            - 'access': Access token string
            - 'refresh': Refresh token string
            - 'user_id': UUID or ID of the user
            - 'email': Email address of the user
            - 'role': Role of the user

    Raises:
        ValueError: If 'user' is not provided in data.
        Exception: For any unexpected errors during token generation.
    """
    try:
        user = data.get('user')
        if not user:
            raise ValueError("User data must be provided to generate tokens.")

        refresh = RefreshToken.for_user(user)
        update_last_login(None, user)
        return {
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user_id': user.id,
            'email': user.email,
            'role': user.role,
        }

    except Exception as e:
        logger.error(f"Error generating tokens: {e}")
        raise e
