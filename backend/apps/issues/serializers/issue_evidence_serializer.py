# apps/issues/serializers/issue_evidence_serializer.py

from rest_framework import serializers
from apps.issues.models.issue_evidence import IssueEvidence


class IssueEvidenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueEvidence
        fields = (
            "id",
            "reference_id",
            "evidence_type",
            "cloudinary_url",
            "file_format",
            "file_size",
            "width",
            "height",
            "created_at",
        )
        read_only_fields = fields