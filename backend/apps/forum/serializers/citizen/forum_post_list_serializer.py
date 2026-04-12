from rest_framework import serializers


class ForumPostListSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    title = serializers.CharField()
    created_at = serializers.DateTimeField()

    category = serializers.SerializerMethodField()
    media_preview = serializers.SerializerMethodField()

    def get_category(self, obj):
        return {
            "id": obj.category.id,
            "name": obj.category.name,
        }

    def get_media_preview(self, obj):
        first_media = obj.media.first()
        return first_media.url if first_media else None