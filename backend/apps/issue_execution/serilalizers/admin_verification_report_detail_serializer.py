from rest_framework import serializers
from apps.issue_execution.models.field_verification_report import FieldVerificationReport
from apps.issues.models.issue_administrative_decision import IssueAdministrativeDecision
from apps.issue_execution.serilalizers.admin_verification_evidence_serializer import AdminVerificationEvidenceSerializer



class AdminVerificationReportDetailSerializer(serializers.ModelSerializer):
    issue_reference_id = serializers.CharField(
        source="solver_task.issue.reference_id"
    )
    issue_title = serializers.CharField(
        source="solver_task.issue.title"
    )
    issue_status = serializers.CharField(
        source="solver_task.issue.status"
    )

    solver_email = serializers.CharField(
        source="submitted_by.email"
    )

    evidence = AdminVerificationEvidenceSerializer(
        many=True,
        source="media",
    )

    has_verification_decision = serializers.SerializerMethodField()

    class Meta:
        model = FieldVerificationReport
        fields = [
            "id",
            "reference_id",
            "submitted_at",

            # Issue context
            "issue_reference_id",
            "issue_title",
            "issue_status",

            # Solver
            "solver_email",

            # Ground verification
            "is_issue_present",
            "severity_level",
            "affected_area_description",

            # Impact
            "public_impact_summary",
            "estimated_people_affected",
            "local_feedback_summary",

            # Estimation
            "estimated_budget",
            "estimated_duration_days",
            "work_nature",

            # Risks
            "site_constraints",
            "execution_risks",

            # Evidence
            "evidence",

            # Decision state
            "has_verification_decision",
        ]

    def get_has_verification_decision(self, obj):
        return IssueAdministrativeDecision.objects.filter(
            issue=obj.solver_task.issue,
            context=IssueAdministrativeDecision.DecisionContext.VERIFICATION_REVIEW,
            is_active=True,
        ).exists()