from rest_framework import serializers
from apps.user.serializers.common.user_base_serializer import BaseUserSerializer
from django.core.exceptions import ValidationError as DjangoValidationError
from apps.user.services.user.signin import generate_refresh_access_token
from django.core.validators import validate_email as django_validate_email
from apps.user.utils.auth_backend import EmailAuthBackend
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied 
class SignInSerializer(BaseUserSerializer):
    password = serializers.CharField(write_only=True)

    class Meta(BaseUserSerializer.Meta):
        fields = ['password'] + BaseUserSerializer.Meta.fields

    def validate_email(self, value):
        value = value.strip()
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
        user = EmailAuthBackend().authenticate(request=self.context.get("request"), username=email, password=password)
        if user is None:
            raise serializers.ValidationError("Invalid email or password.")
        if user.is_verified is False:
            raise serializers.ValidationError("Email is not verified.")
        if user.role != 'citizen':
            raise PermissionDenied("User does not have citizen access.")
        attrs['user'] = user
        return attrs  

    def create(self, validated_data):
        return generate_refresh_access_token(validated_data)
