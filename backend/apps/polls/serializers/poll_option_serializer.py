from rest_framework import serializers
from apps.polls.models import PollOption
from apps.polls.models import Poll


class PollOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PollOption
        fields = ["id", "option_text", "order"]


class PollListSerializer(serializers.ModelSerializer):
    options = PollOptionSerializer(many=True)
    has_voted = serializers.BooleanField()
    total_votes = serializers.IntegerField()
    status = serializers.CharField(source="effective_status")
    class Meta:
        model = Poll
        fields = [
            "id",
            "reference_id",
            "question",
            "context",
            "image_url",
            "expires_at",
            "has_voted",
            "total_votes",
            "options",
            "status",
        ]