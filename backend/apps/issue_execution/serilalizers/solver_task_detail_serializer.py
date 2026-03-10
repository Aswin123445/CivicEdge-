from rest_framework import serializers
from apps.issue_execution.models.solver_task import SolverTask
from apps.issues.serializers.issue_evidence_serializer import IssueEvidenceSerializer
from apps.issue_execution.serilalizers.verification_review_serializer import SolverVerificationReportDetailSerializer


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
    latest_report = serializers.SerializerMethodField()

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
            "latest_report"
        ]

    def get_navigation_url(self, obj):
        lat = obj.issue.location.latitude
        lng = obj.issue.location.longitude
        return f"https://www.google.com/maps?q={lat},{lng}"
    def get_evidences(self, obj):
        evidences =  obj.issue.evidences.all() 
        return IssueEvidenceSerializer(evidences, many=True).data

    def get_latest_report(self, obj):
        report = obj.verification_reports.order_by('-created_at').first()
        if report is None:
            return None
        return SolverVerificationReportDetailSerializer(report).data