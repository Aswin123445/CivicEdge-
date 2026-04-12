from rest_framework import serializers


class ForumCommentListSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    content = serializers.CharField()
    created_at = serializers.DateTimeField()

    user = serializers.SerializerMethodField()

    def get_user(self, obj):
        return {
            "id": obj.user.id,
            "name": obj.user.profile.name if obj.user.profile.name else obj.user.email.split("@")[0],
        }