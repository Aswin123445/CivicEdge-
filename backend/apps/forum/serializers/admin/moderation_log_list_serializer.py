from rest_framework import serializers


class ModerationLogListSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    target_type = serializers.CharField()
    target_id = serializers.UUIDField()
    action = serializers.CharField()
    reason = serializers.CharField(allow_blank=True)
    metadata = serializers.JSONField()
    created_at = serializers.DateTimeField()

    moderator = serializers.SerializerMethodField()

    def get_moderator(self, obj):
        return {
            "id": obj.moderator.id,
            "name": obj.moderator.profile.name if obj.moderator.profile.name else obj.moderator.email.split("@")[0],
        }