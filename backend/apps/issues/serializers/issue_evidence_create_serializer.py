from rest_framework import serializers
from apps.issues.models.issue_evidence import IssueEvidence


class IssueEvidenceCreateSerializer(serializers.Serializer):
    cloudinary_public_id = serializers.CharField(max_length=255)
    cloudinary_url = serializers.URLField()

    evidence_type = serializers.ChoiceField(
        choices=IssueEvidence.EvidenceType.choices
    )

    file_format = serializers.CharField(max_length=10)
    file_size = serializers.IntegerField(min_value=1)

    width = serializers.IntegerField(required=False, min_value=1)
    height = serializers.IntegerField(required=False, min_value=1)
