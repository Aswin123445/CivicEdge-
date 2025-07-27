from apps.user.serializers.common.user_base_serializer import BaseUserSerializer
from rest_framework import serializers
from apps.user.utils.password_validaton import validate_strong_password
from apps.user.services.user.register_user import register_user
from shared.exceptions.custom_exceptions import PasswordMismatchError
from django.core.validators import validate_email as django_validate_email
from django.core.exceptions import ValidationError as DjangoValidationError

class UserCreateSerializer(BaseUserSerializer):
    """
    Serializer for user registration.

    Accepts email, password, confirm password, and role.
    Validates password strength and confirms matching passwords.
    Delegates actual creation to the user service layer.
    """
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, min_length=8)

    class Meta(BaseUserSerializer.Meta):
        fields = BaseUserSerializer.Meta.fields + ['password', 'confirm_password', 'role']

    def validate_password(self, value):
        """
        Validates the strength of the password using a custom utility.

        Args:
            value (str): The password to validate.

        Returns:
            str: The validated password.
        """
        validate_strong_password(value)
        return value
    
    def validate_email(self, value):
        value = value.strip()

        # Length check
        if len(value) > 254:  # match EmailField default max_length
            raise serializers.ValidationError("Ensure email has at most 254 characters.")

        # Format check
        try:
            django_validate_email(value)
        except DjangoValidationError:
            raise serializers.ValidationError("Enter a valid email address.")

        return value

    def validate(self, attrs):
        """
        Validates that the password and confirm_password fields match.

        Args:
            attrs (dict): Serializer input data.

        Raises:
            serializers.ValidationError: If passwords do not match.

        Returns:
            dict: Validated attributes without `confirm_password`.
        """
        confirm_password = attrs.pop('confirm_password', None)
        if attrs.get('password') != confirm_password:
            raise serializers.ValidationError("Passwords do not match.")
        return attrs

    def create(self, validated_data):
        """
        Creates a new user using the service layer.

        Args:
            validated_data (dict): Validated user data.

        Returns:
            User: The created user instance.
        """
        user = register_user(validated_data)
        return user