from rest_framework import serializers
from apps.issues.models.issues import Issue


class AdminIssueReviewSerializer(serializers.ModelSerializer):
    reporter_name = serializers.CharField(source="reporter.profile.name", read_only=True)
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Issue
        fields = [
            "id",
            "reference_id",
            "title",
            "description",
            "status",
            "reporter_name",
            "category_name",
            "created_at",
        ]