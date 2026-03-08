from rest_framework import serializers
from apps.issues.models.issue_category import IssueCategory
class IssueCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueCategory
        fields = ("id","reference_id", "name", "description","icon")
        read_only_fields = (fields)