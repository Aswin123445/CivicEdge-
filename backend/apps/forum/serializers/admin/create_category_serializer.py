from rest_framework import serializers
from apps.forum.utils.validators.is_noise import is_noise
class CreateCategorySerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Category name cannot be empty")

        if is_noise(value):
            raise serializers.ValidationError("Category name cannot be meaningless")
        return value.strip().lower()