from rest_framework import serializers
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_decode
from rest_framework import serializers
from apps.user.utils.validator.password_validaton import validate_strong_password

User = get_user_model()

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    def validate_email(self, value):
        from apps.user.models import User
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email does not exist.")
        return value
    

class ResetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    
    def validate_new_password(self, value):
        """
        Validates the strength of the password using a custom utility.

        Args:
            value (str): The password to validate.

        Returns:
            str: The validated password.
        """
        validate_strong_password(value)
        return value

    def validate(self, attrs):
        uidb64 = self.context.get('uidb64')
        token = self.context.get('token')
        new_password = attrs.get('new_password')
        confirm_password = attrs.get('confirm_password')

        if new_password != confirm_password:
            raise serializers.ValidationError("Passwords do not match.")

        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(id=uid)
        except Exception:
            raise serializers.ValidationError("Invalid UID.")

        if not default_token_generator.check_token(user, token):
            raise serializers.ValidationError("Invalid or expired token.")
        attrs['user'] = user
        return attrs

