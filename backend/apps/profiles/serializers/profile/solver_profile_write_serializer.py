from rest_framework import serializers
from apps.user.models.user import Profile
from apps.user.utils.validator import indian_phone_validator, name_validator


class SolverProfileWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "phone",
            "skills",
            "name"
        ]

    def validate_name(self, value):
        return name_validator(value)

    def validate_phone(self, value):
        indian_phone_validator(value)
        return value
