from rest_framework import serializers
from apps.issues.models.issue_category import IssueCategory

class IssueCategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueCategory
        fields = [
            "id",
            "reference_id",
            "name",
            "description",
            "icon",
            "display_order",
            "is_active",
        ]
        



class IssueCategoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueCategory
        fields = [
            "name",
            "description",
            "icon",
            "display_order",
        ]
        


class IssueCategoryUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueCategory
        fields = [
            "name",
            "description",
            "icon",
            "display_order"
        ]

class IssueCategoryActiveToggleSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueCategory
        fields = [
            "is_active"
            ]