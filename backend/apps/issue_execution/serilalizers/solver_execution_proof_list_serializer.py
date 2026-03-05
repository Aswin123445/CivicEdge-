from rest_framework import serializers

from apps.issue_execution.models.execution_proof import ExecutionProof



class SolverExecutionProofListSerializer(serializers.ModelSerializer):



    class Meta:
        model = ExecutionProof
        fields = [
            "id",
            "reference_id",
            "review_status",
            "is_active",
            "created_at",
        ]
        read_only_fields = [
            "reference_id",
            "review_status",
            "is_active",
            "created_at",
            "submitted_at",
        ]