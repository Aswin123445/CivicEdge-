from django.contrib.auth import get_user_model
from apps.user.models.user import Profile
from rest_framework.exceptions import NotAuthenticated, ValidationError ,PermissionDenied
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

def google_register_signin_service(user_info):
    if not user_info:
        raise ValidationError("Invalid token data")
    email_verified = user_info.get("verified_email")
    email = user_info.get("email")
    name = user_info.get("name")
    picture = user_info.get("picture")

    if not email:
        raise ValidationError("Email not provided by Google")

    if not email_verified:
        raise NotAuthenticated("Google account not verified. Please verify your account.")

    # Create or update user
    user, created = User.objects.update_or_create(
        email=email,
        defaults={
            "is_verified": True,
            "is_active": True,
        }
    )
    if created:
        user.set_unusable_password()
        user.save()
    else :
        if user.role != 'citizen':
            raise PermissionDenied('only citizen can access the endpoint')

    # Handle profile
    profile, profile_created = Profile.objects.get_or_create(user=user)

    if profile_created:
        profile.name = name or ""
        if picture:
            profile.avatar_url = picture
        profile.save()
    else:
        # Only update avatar if picture is valid and avatar is missing or outdated
        if picture and (not profile.avatar_url ):
            profile.avatar_url = picture
            profile.save()
    refresh = RefreshToken.for_user(user)
    access = refresh.access_token
    return user, str(access), str(refresh)
