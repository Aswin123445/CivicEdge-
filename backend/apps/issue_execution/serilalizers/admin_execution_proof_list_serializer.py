from rest_framework import serializers

from apps.issue_execution.models.execution_proof import ExecutionProof
class AdminExecutionProofListSerializer(serializers.ModelSerializer):
    issue_reference = serializers.CharField(
        source="solver_task.issue.reference_id",
        read_only=True
    )
    solver_name = serializers.CharField(
        source="submitted_by.get_full_name",
        read_only=True
    )

    class Meta:
        model = ExecutionProof
        fields = [
            "id",
            "reference_id",
            "issue_reference",
            "solver_name",
            "submitted_at",
        ]