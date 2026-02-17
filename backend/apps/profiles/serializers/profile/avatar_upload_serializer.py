from rest_framework import serializers

class AvatarUploadSerializer(serializers.Serializer):
    avatar = serializers.ImageField()
    def validate_avatar(self, value):
        if value.size > 5 * 1024 * 1024:
            raise serializers.ValidationError("Max 5MB allowed.")
        if not value.content_type.startswith("image/"):
            raise serializers.ValidationError("Only images allowed.")
        return value
