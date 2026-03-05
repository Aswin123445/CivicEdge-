from rest_framework import serializers
from apps.issue_execution.models.solver_task import SolverTask


class SolverTaskDetailSerializer(serializers.ModelSerializer):
    issue_reference = serializers.CharField(source="issue.reference_id")
    issue_title = serializers.CharField(source="issue.title")
    issue_description = serializers.CharField(source="issue.description")
    category_name = serializers.CharField(source="issue.category.name")
    issue_status = serializers.CharField(source="issue.status")

    latitude = serializers.FloatField(source="issue.location.latitude")
    longitude = serializers.FloatField(source="issue.location.longitude")
    zone = serializers.CharField(source="issue.location.zone")

    navigation_url = serializers.SerializerMethodField()

    class Meta:
        model = SolverTask
        fields = [
            "id",
            "reference_id",
            "status",
            "issue_reference",
            "issue_title",
            "issue_description",
            "category_name",
            "issue_status",
            "latitude",
            "longitude",
            "zone",
            "navigation_url",
            "created_at",
        ]

    def get_navigation_url(self, obj):
        lat = obj.issue.location.latitude
        lng = obj.issue.location.longitude
        return f"https://www.google.com/maps?q={lat},{lng}"