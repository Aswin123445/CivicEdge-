from rest_framework import serializers
from apps.issues.models.issues import Issue


class IssueDraftListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = (
            "id",
            "title",
            "draft_step",
            "updated_at",
        )
