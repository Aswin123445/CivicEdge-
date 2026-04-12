from rest_framework import serializers
from apps.forum.models.forum_category import ForumCategory

from apps.forum.utils.validators.is_noise import is_noise

class ForumPostMediaInputSerializer(serializers.Serializer):
    url = serializers.URLField()
    public_id = serializers.CharField(max_length=255)


class CreateForumPostSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255, min_length=3)
    content = serializers.CharField(min_length=7)
    category_id = serializers.UUIDField()
    images = ForumPostMediaInputSerializer(many=True, required=False)

    def validate_title(self, value):
        value = value.strip()

        if is_noise(value):
            raise serializers.ValidationError("Title cannot be empty or meaningless")

        return value

    def validate_content(self, value):
        value = value.strip()

        if is_noise(value):
            raise serializers.ValidationError("Content cannot be empty or meaningless")

        return value

    def validate_category_id(self, value):
        if not ForumCategory.objects.filter(id=value, is_active=True).exists():
            raise serializers.ValidationError("Invalid or inactive category")
        return value

    def validate_images(self, value):
        if not value:
            return value

        if len(value) > 5:
            raise serializers.ValidationError("Maximum 5 images allowed")

        return value