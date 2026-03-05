from rest_framework import serializers
from apps.issue_execution.models.verification_evidence import VerificationEvidence


class AdminVerificationEvidenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = VerificationEvidence
        fields = [
            "id",
            "reference_id",
            "secure_url",
            "resource_type",
            "format",
            "width",
            "height",
            "bytes",
            "uploaded_at",
        ]