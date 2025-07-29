from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
def logout_user_by_refresh_token(refresh_token: str):
    if not refresh_token:
        raise ValidationError("Refresh token is required.")
    
    token = RefreshToken(refresh_token)
    token.blacklist()