from rest_framework import serializers
from apps.issue_execution.models.field_verification_report import FieldVerificationReport


class AdminVerificationReportListSerializer(serializers.ModelSerializer):
    issue_reference_id = serializers.CharField(
        source="solver_task.issue.reference_id"
    )
    issue_title = serializers.CharField(
        source="solver_task.issue.title"
    )
    solver_email = serializers.CharField(
        source="submitted_by.email"
    )

    class Meta:
        model = FieldVerificationReport
        fields = [
            "id",
            "reference_id",
            "submitted_at",
            "issue_reference_id",
            "issue_title",
            "solver_email",
        ]