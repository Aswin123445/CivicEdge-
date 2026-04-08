from rest_framework import serializers
from apps.polls.models import Poll


from django.utils.timezone import now

from apps.polls.models.polls import Status

class AdminPollListSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    total_votes = serializers.IntegerField()

    class Meta:
        model = Poll
        fields = [
            "id",
            "reference_id",
            "question",
            "status",
            "total_votes",
            "created_at",
            "expires_at",
        ]

    def get_status(self, obj):
        if obj.status == Status.CLOSED:
            return "closed"

        if obj.expires_at and obj.expires_at < now():
            return "closed"

        return "active"