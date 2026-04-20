from rest_framework import serializers

from apps.notification.models.activiity_log import ActivityFeed


class ActivityFeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityFeed
        fields = [
            "id",
            "entity",
            "action",
            "message",
            "id",
            "created_at",
        ]