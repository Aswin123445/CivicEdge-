from rest_framework import serializers
from apps.user.models.user import Profile
from apps.user.utils.validator.indian_phone_validator import indian_phone_validator
from apps.user.utils.validator.name_validator import name_validator


class SolverProfileWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "phone",
            "skills",
            "name",
            "bio",
        ]

    def validate_name(self, value):
        return name_validator(value)

    def validate_phone(self, value):
        indian_phone_validator(value)
        return value
