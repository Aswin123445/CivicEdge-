# apps/issues/serializers/issue_summary_serializer.py

from rest_framework import serializers
from apps.issues.models.issues import Issue


class IssueSummarySerializer(serializers.ModelSerializer):
    category = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Issue
        fields = (
            "id",
            "reference_id",
            "title",
            "description",
            "category",
            "status",
            "draft_step",
            "created_at",
            "updated_at",
        )
        read_only_fields = fields