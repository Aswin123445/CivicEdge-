from rest_framework import serializers
from django.utils.timezone import now
from apps.polls.models import Poll
from apps.polls.models.polls import Status


class AdminPollDetailSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    results = serializers.SerializerMethodField()
    total_votes = serializers.SerializerMethodField()

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
            "created_at",
            "status",
            "results",
            "total_votes",
        ]

    def get_status(self, obj):
        if obj.status == Status.CLOSED:
            return "closed"

        if obj.expires_at and obj.expires_at < now():
            return "expired"

        return "active"

    def get_results(self, obj):
        return self.context.get("results", [])

    def get_total_votes(self, obj):
        return self.context.get("total_votes", 0)