from rest_framework import serializers

from apps.forum.models.forum_post_media import ForumPostMedia


class ForumPostMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForumPostMedia
        fields = ["url", "public_id"]


class CategorySerializer(serializers.Serializer):
    id = serializers.UUIDField()
    name = serializers.CharField()


class ForumPostResponseSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    title = serializers.CharField()
    content = serializers.CharField()
    category = CategorySerializer()
    media = ForumPostMediaSerializer(many=True)
    created_at = serializers.DateTimeField()