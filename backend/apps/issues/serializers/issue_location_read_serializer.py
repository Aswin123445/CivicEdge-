# apps/issues/serializers/issue_location_serializer.py

from rest_framework import serializers
from apps.issues.models.issue_location import IssueLocation


class IssueLocationReadSerializer(serializers.ModelSerializer):
    # normalize field names for frontend
    lat = serializers.DecimalField(
        source="latitude",
        max_digits=9,
        decimal_places=6,
        read_only=True
    )
    lng = serializers.DecimalField(
        source="longitude",
        max_digits=9,
        decimal_places=6,
        read_only=True
    )

    # flatten zone relation
    zone = serializers.CharField(source="zone.name", read_only=True)

    class Meta:
        model = IssueLocation
        fields = (
            "id",
            "reference_id",
            "lat",
            "lng",
            "zone",
            "landmark_description",
            "accuracy_radius",
            "created_at",
        )
        read_only_fields = fields