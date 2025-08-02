from rest_framework import serializers
from django.contrib.auth import authenticate
from apps.user.utils.validator.password_validaton import validate_strong_password
from django.core.validators import validate_email as django_validate_email
from django.core.exceptions import ValidationError as DjangoValidationError

class AdminLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    
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
    def validate_email(self,value):
        try:
            django_validate_email(value)
        except DjangoValidationError:
            raise serializers.ValidationError("Enter a valid email address.")
        return value

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(username=email, password=password)
        print(user)
        if not user:
            raise serializers.ValidationError("Invalid email or password.")
        if user.role != 'admin':
            raise serializers.ValidationError("User is not an admin.")

        attrs['user'] = user
        return attrs
