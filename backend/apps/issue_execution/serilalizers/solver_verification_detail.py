from rest_framework import serializers
from apps.issue_execution.models.field_verification_draft import FieldVerificationDraft
from apps.issue_execution.serilalizers.verification_evidence_serializer import CloudinaryEvidenceSerializer



class SolverVerificationDraftReportDetailSerializer(serializers.ModelSerializer):
    evidence = serializers.SerializerMethodField()
    class Meta:
        model = FieldVerificationDraft
        fields = [
            "id",
            "is_submitted",
            "solver_task",

            # Issue context
            "is_issue_present",
            "severity_level",
            "affected_area_description",

            # Solver
            "public_impact_summary",

            # Ground verification
            "estimated_people_affected",
            "local_feedback_summary",
            "estimated_budget",

            # Impact
            "estimated_duration_days",
            "site_constraints",
            "execution_risks",
            # Evidence
            "evidence",
        ]

    def get_evidence(self, obj):
        return CloudinaryEvidenceSerializer(obj.media.all(), many=True).data

