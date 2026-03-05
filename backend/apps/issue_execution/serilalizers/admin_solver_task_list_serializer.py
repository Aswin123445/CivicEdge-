from rest_framework import serializers
from apps.issue_execution.models.solver_task import SolverTask


class AdminSolverTaskListSerializer(serializers.ModelSerializer):
    issue_reference_id = serializers.CharField(
        source="issue.reference_id"
    )
    issue_title = serializers.CharField(
        source="issue.title"
    )
    solver_email = serializers.CharField(
        source="solver.email"
    )
    contractor_name = serializers.CharField(
        source="contractor.name",
        allow_null=True,
    )

    class Meta:
        model = SolverTask
        fields = [
            "id",
            "reference_id",
            "status",
            "issue_reference_id",
            "issue_title",
            "solver_email",
            "contractor_name",
            "updated_at",
        ]