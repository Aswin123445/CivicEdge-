from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from rest_framework.exceptions import PermissionDenied

User = get_user_model()

class EmailAuthBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = User.objects.get(email=username)
        except User.DoesNotExist:
            return None

        if not user.check_password(password):
            return None

        if not user.is_active :
            raise PermissionDenied("Denied access .Account is not active")
        if not user.is_verified:
            raise PermissionDenied("Account not Verified")
        return user
  