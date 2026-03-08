from rest_framework import serializers
from django.utils.timesince import timesince
from django.utils.timezone import now

from apps.issues.models.issues import Issue


class AdminIssueReviewSerializer(serializers.ModelSerializer):
    submitted_at = serializers.DateTimeField(source="created_at", read_only=True)

    submitted_display = serializers.SerializerMethodField()
    media_count = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()

    class Meta:
        model = Issue
        fields = [
            "id",
            "reference_id",
            "title",
            "location",
            "submitted_at",
            "submitted_display",
            "media_count",
        ]

    def get_submitted_display(self, obj):
        return f"{timesince(obj.created_at, now())} ago"

    def get_media_count(self, obj):
        return obj.evidences.count() if hasattr(obj, "evidences") else 0

    def get_location(self, obj):
        if obj.location:
            return obj.location.zone.name
        return None

