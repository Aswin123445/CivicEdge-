# apps/accounts/serializers/change_password_serializer.py

from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework.exceptions import ValidationError as DjangoValidationError

from apps.user.utils.validator.password_validaton import validate_strong_password



class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate_current_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect.")
        return value
    
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
        if attrs["new_password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                {"confirm_password": "Passwords do not match."}
            )

        try:
            validate_password(attrs["new_password"], self.context["request"].user)
        except DjangoValidationError as e:
            raise serializers.ValidationError(
                {"new_password": list(e.messages)}
            )

        return attrs