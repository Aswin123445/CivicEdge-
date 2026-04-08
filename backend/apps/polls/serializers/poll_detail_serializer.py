from rest_framework import serializers
from apps.polls.models import Poll
from apps.polls.serializers.poll_option_serializer import PollOptionSerializer


class PollDetailSerializer(serializers.ModelSerializer):
    options = PollOptionSerializer(many=True)
    has_voted = serializers.BooleanField()

    results = serializers.SerializerMethodField()
    total_votes = serializers.SerializerMethodField()
    user_choice = serializers.SerializerMethodField()
    status = serializers.CharField(source="effective_status")

    class Meta:
        model = Poll
        fields = [
            "id",
            "reference_id",
            "question",
            "context",
            "did_you_know",
            "image_url",
            "expires_at",
            "has_voted",
            "options",
            "results",
            "total_votes",
            "user_choice",
            "status",
        ]

    def get_results(self, obj):
        if not obj.has_voted:
            return None
        return self.context.get("results", [])

    def get_total_votes(self, obj):
        if not obj.has_voted:
            return None
        return self.context.get("total_votes", 0)

    def get_user_choice(self, obj):
        if not obj.has_voted:
            return None
        return self.context.get("user_choice")