from rest_framework import serializers

from apps.issue_execution.models.execution_proof import ExecutionProof
class ExecutionEvidenceSerializer(serializers.Serializer):
    public_id = serializers.CharField()
    secure_url = serializers.URLField()
    resource_type = serializers.CharField()


class SolverExecutionProofDetailSerializer(serializers.ModelSerializer):



    evidences = serializers.SerializerMethodField()

    class Meta:
        model = ExecutionProof
        fields = [
            "reference_id",
            "completion_summary",
            "deviations_from_plan",
            "remaining_issues",
            "submitted_at",
            "evidences",
            "review_status",
            "admin_message"
        ]

    def get_evidences(self, obj):
        return [
            {
                "public_id": e.public_id,
                "secure_url": e.secure_url,
                "resource_type": e.resource_type,
            }
            for e in obj.evidences.all()
        ]