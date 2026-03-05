from rest_framework import serializers
from apps.issue_execution.models.execution_evidence import ExecutionEvidence


class ExecutionEvidenceReadSerializer(serializers.ModelSerializer):

    uploaded_by = serializers.UUIDField(source="uploaded_by.id", read_only=True)

    class Meta:
        model = ExecutionEvidence
        fields = [
            "reference_id",
            "public_id",
            "secure_url",
            "resource_type",
            "format",
            "uploaded_by",
            "uploaded_at",
        ]

        read_only_fields = fields