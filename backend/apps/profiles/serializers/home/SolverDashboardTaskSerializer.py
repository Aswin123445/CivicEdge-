from rest_framework import serializers

from apps.issue_execution.models.solver_task import SolverTask
from apps.issue_execution.serilalizers.solver_progress_update_serializer import SolverProgressUpdateSerializer
class DashboardTaskSerializer(serializers.ModelSerializer):

    issue_title = serializers.CharField(source="issue.title")
    category = serializers.CharField(source="issue.category.name")
    location = serializers.CharField(source="issue.location.zone.name")

    class Meta:
        model = SolverTask
        fields = [
            "id",
            "reference_id",
            "issue_title",
            "status",
            "assigned_at",
            "category",
            "location",
            "assigned_at"
        ]
class DashboardInProgressTaskSerializer(serializers.ModelSerializer):

    issue_title = serializers.CharField(source="issue.title")
    latest_progress_summary = serializers.SerializerMethodField()

    class Meta:
        model = SolverTask
        fields = [
            "id",
            "reference_id",
            "issue_title",
            "latest_progress_summary",
        ]

    def get_latest_progress_summary(self, obj):
        data = obj.progress_updates.order_by("-created_at").first()
        return SolverProgressUpdateSerializer(data).data
        
class SolverDashboardSerializer(serializers.Serializer):

    metrics = serializers.DictField()

    recent_assigned_tasks = DashboardTaskSerializer(many=True)

    in_progress_tasks = DashboardInProgressTaskSerializer(many=True)

    recent_resolved_tasks = DashboardTaskSerializer(many=True)