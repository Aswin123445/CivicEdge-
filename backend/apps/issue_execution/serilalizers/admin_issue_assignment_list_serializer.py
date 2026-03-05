from rest_framework import serializers
from apps.issues.models.issues import Issue


class AdminIssueAssignmentListSerializer(serializers.ModelSerializer):
    reporter_email = serializers.CharField(source="reporter.email", read_only=True)
    category_name = serializers.CharField(source="category.name")

    class Meta:
        model = Issue
        fields = [
            "id",
            "reference_id",
            "title",
            "reporter_email",
            "category_name",
            "created_at",
        ]