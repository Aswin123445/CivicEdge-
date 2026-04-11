from rest_framework import serializers
from apps.notification.models.notification import Notification


class NotificationSerializer(serializers.ModelSerializer):
    is_unread = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = [
            "id",
            "type",
            "title",
            "message",
            "created_at",
            "target_type",
            "target_id",
            "redirect_url",
            "is_unread",
        ]

    def get_is_unread(self, obj):
        user = self.context["request"].user
        state = user.notification_state

        if state.last_seen_at is None:
            return not obj.is_read

        return (
            obj.created_at > state.last_seen_at
            and not obj.is_read
        )