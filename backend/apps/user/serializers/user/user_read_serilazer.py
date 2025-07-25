from apps.user.serializers.common.user_base_serializer import BaseUserSerializer
from rest_framework import serializers

class UserReadSerializer(BaseUserSerializer):
    """
    Serializer for reading user details.

    Returns basic non-sensitive user information.
    Typically used in GET requests after authentication or registration.

    Fields:
        - id (UUID): Unique identifier of the user.
        - email (str): User's email address.
        - role (str): User's role in the system (citizen/solver/admin).
        - created_at (datetime): Timestamp of user creation.
        - is_verified (bool): Indicates if the user's email is verified.
    """
    role = serializers.CharField(help_text="User's role in the system (citizen/solver/admin)")

    class Meta(BaseUserSerializer.Meta):
        fields = BaseUserSerializer.Meta.fields + ['role', 'created_at', 'is_verified']
        extra_kwargs = {
            **BaseUserSerializer.Meta.extra_kwargs,
            'created_at': {'read_only': True},
            'is_verified': {'read_only': True},
        }