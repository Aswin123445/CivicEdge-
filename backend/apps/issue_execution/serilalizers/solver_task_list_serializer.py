from rest_framework import serializers
from apps.issue_execution.models.solver_task import SolverTask


class SolverTaskListSerializer(serializers.ModelSerializer):
    issue_reference = serializers.CharField(source="issue.reference_id")
    issue_title = serializers.CharField(source="issue.title")
    category_name = serializers.CharField(source="issue.category.name")
    issue_status = serializers.CharField(source="issue.status")

    class Meta:
        model = SolverTask
        fields = [
            "id",
            "reference_id",
            "status",
            "issue_reference",
            "issue_title",
            "category_name",
            "issue_status",
            "created_at",
        ]