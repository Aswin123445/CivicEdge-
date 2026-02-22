from rest_framework import serializers
from apps.issues.models.issues import Issue


class IssueDraftDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = (
            "id",
            "title",
            "description",
            "category",
            "draft_step",
            "created_at",
            "updated_at",
        )
