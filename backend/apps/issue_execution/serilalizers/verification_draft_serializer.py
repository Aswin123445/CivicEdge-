from rest_framework import serializers
from apps.issue_execution.models import FieldVerificationDraft


class FieldVerificationDraftSerializer(serializers.ModelSerializer):
    evidence_completed = serializers.SerializerMethodField()

    class Meta:
        model = FieldVerificationDraft
        fields = [
            "id",
            "ground_verification_completed",
            "impact_assessment_completed",
            "estimation_completed",
            "evidence_completed",
            "created_at",
            "updated_at",
        ]
        read_only_fields = fields

    def get_evidence_completed(self, obj):
        return obj.media.exists()