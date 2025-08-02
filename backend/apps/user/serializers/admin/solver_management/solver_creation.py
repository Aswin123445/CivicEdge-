from rest_framework import serializers
from apps.user.utils.validator.password_validaton import validate_strong_password
from apps.user.utils.validator.name_validator import name_validator
from apps.user.services.admin.solver_management.solver_creation import create_solver

class AdminCreateSolverSerializer(serializers.Serializer):
    name = serializers.CharField(write_only=True ,validators = [name_validator])
    password = serializers.CharField(write_only=True,validators = [validate_strong_password])
    email = serializers.EmailField()

    def validate_email(self, value):
        # strip outer whitespace and normalize case
        cleaned = value.strip().lower()
        return cleaned
    def create(self, validated_data):
        return create_solver(validated_data)