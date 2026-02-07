from rest_framework import serializers
from django.contrib.auth import get_user_model

from apps.user.utils.validator.password_validaton import validate_strong_password
from apps.user.utils.validator.name_validator import name_validator
from apps.user.services.admin.solver_management.solver_creation import create_solver
from apps.user.models.user import Zone
User = get_user_model()


class AdminCreateSolverSerializer(serializers.ModelSerializer):
    # Writable fields
    name = serializers.CharField(
        source="profile.name",
        validators=[name_validator]
    )
    password = serializers.CharField(
        write_only=True,
        validators=[validate_strong_password]
    )
    email = serializers.EmailField()

    zone_id = serializers.PrimaryKeyRelatedField(
        queryset=Zone.objects.all(),
        source="profile.zone",
        write_only=True
    )

    # Read-only fields
    profile = serializers.URLField(
        source="profile.avatar_url",
        read_only=True
    )
    phone = serializers.CharField(
        source="profile.phone",
        read_only=True
    )
    zone = serializers.CharField(
        source="profile.zone.name",
        read_only=True
    )

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "name",
            "password",
            "role",
            "is_active",
            "created_at",
            "phone",
            "zone",      # read-only output
            "zone_id",   # write-only input
            "profile",
        ]

    def validate_email(self, value):
        return value.strip().lower()

    def create(self, validated_data):
        return create_solver(validated_data)
