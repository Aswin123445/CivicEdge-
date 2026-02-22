from rest_framework import serializers
from apps.issues.models.issues import Issue
from apps.issues.models.issue_category import IssueCategory


class IssueCreateSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=IssueCategory.objects.filter(is_active=True).all(),
        write_only=True,
    )
    class Meta:
        model = Issue
        fields = (
            "title",
            "description",
            "category",
        )

    def validate_title(self, value):
        if len(value.strip()) < 5:
            raise serializers.ValidationError("Title is too short.")
        return value

    def validate_description(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Description must be at least 10 characters long.")
        return value
