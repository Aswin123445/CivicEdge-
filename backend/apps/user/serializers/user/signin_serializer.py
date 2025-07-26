from rest_framework import serializers
from django.contrib.auth import authenticate
from apps.user.serializers.common.user_base_serializer import BaseUserSerializer
from django.core.validators import validate_email as django_validate_email
from django.core.exceptions import ValidationError as DjangoValidationError
from apps.user.services.user.signin import generate_refresh_access_token

class SignInSerializer(BaseUserSerializer):
    password = serializers.CharField(write_only=True)

    class Meta(BaseUserSerializer.Meta):
        fields = ['password'] + BaseUserSerializer.Meta.fields

    def validate_email(self, value):
        # Basic presence check
        if not value:
            raise serializers.ValidationError("Email is required.")

        # Format check using Django's built-in email validator
        try:
            django_validate_email(value)
        except DjangoValidationError:
            raise serializers.ValidationError("Enter a valid email address.")

        return value

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(request=self.context.get('request'), email=email, password=password)

        if not user:
            raise serializers.ValidationError("Invalid credentials.")
        if not user.is_active:
            raise serializers.ValidationError("User account is disabled.")

        attrs['user'] = user
        return attrs

    def create(self, validated_data):
        return generate_refresh_access_token(validated_data)
