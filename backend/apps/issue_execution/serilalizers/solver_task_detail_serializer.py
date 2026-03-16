from rest_framework import serializers
from apps.issue_execution.models.solver_task import SolverTask
from apps.issues.serializers.issue_evidence_serializer import IssueEvidenceSerializer
from apps.issue_execution.serilalizers.verification_review_serializer import (
    SolverVerificationReportDetailSerializer,
)
from apps.issue_execution.serilalizers.solver_progress_update_serializer import (
    SolverProgressUpdateSerializer,
)


class SolverTaskDetailSerializer(serializers.ModelSerializer):
    issue_reference = serializers.CharField(source="issue.reference_id")
    issue_title = serializers.CharField(source="issue.title")
    issue_description = serializers.CharField(source="issue.description")
    category_name = serializers.CharField(source="issue.category.name")
    issue_status = serializers.CharField(source="issue.status")

    latitude = serializers.FloatField(source="issue.location.latitude")
    longitude = serializers.FloatField(source="issue.location.longitude")
    zone = serializers.CharField(source="issue.location.zone")

    navigation_url = serializers.SerializerMethodField()
    evidences = serializers.SerializerMethodField()
    issue_created_at = serializers.DateTimeField(source="issue.created_at")
    reporter = serializers.EmailField(source="issue.reporter.email")
    latest_report = serializers.SerializerMethodField(allow_null=True, required=False)
    contractor_email = serializers.EmailField(
        source="contractor.contact_email", allow_null=True, required=False
    )
    contractor_name = serializers.CharField(source="contractor.name",allow_null=True, required=False)
    latest_execution_proofs = serializers.SerializerMethodField(allow_null=True, required=False)
    progress_update = serializers.SerializerMethodField(allow_null=True, required=False)

    class Meta:
        model = SolverTask
        fields = [
            "id",
            "reference_id",
            "status",
            "issue_reference",
            "issue_title",
            "issue_description",
            "category_name",
            "issue_status",
            "latitude",
            "longitude",
            "zone",
            "navigation_url",
            "created_at",
            "evidences",
            "issue_created_at",
            "reporter",
            "latest_report",
            "contractor_email",
            "contractor_name",
            "latest_execution_proofs",
            "progress_update",
        ]

    def get_navigation_url(self, obj):
        lat = obj.issue.location.latitude
        lng = obj.issue.location.longitude
        return f"https://www.google.com/maps?q={lat},{lng}"

    def get_evidences(self, obj):
        evidences = obj.issue.evidences.all()
        return IssueEvidenceSerializer(evidences, many=True).data

    def get_latest_report(self, obj):
        report = obj.verification_reports.order_by("-created_at").first()
        if report is None:
            return None
        return SolverVerificationReportDetailSerializer(report).data

    def get_latest_execution_proofs(self, obj):
        proofs = obj.execution_proofs.order_by("-created_at").first()
        if proofs is None:
            return None
        admin_message = (
            proofs.admin_message
            if proofs.admin_message
            else "Please wait for admin review"
        )
        return {
            "id": proofs.id,
            "admin_message": admin_message,
            "review_status": proofs.review_status,
        }

    def get_progress_update(self, obj):
        data = SolverProgressUpdateSerializer(
            obj.progress_updates.order_by("-created_at"), many=True
        ).data
        return data
