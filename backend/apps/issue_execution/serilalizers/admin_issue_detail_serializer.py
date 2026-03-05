from rest_framework import serializers

from apps.issues.models.issues import Issue
from apps.issues.models.issue_administrative_decision import IssueAdministrativeDecision
from apps.issue_execution.models.solver_task import SolverTask
from apps.issues.models.issue_evidence import IssueEvidence
class AdminDecisionSerializer(serializers.ModelSerializer):
    decided_by = serializers.CharField(source="decided_by.email")

    class Meta:
        model = IssueAdministrativeDecision
        fields = [
            "id",
            "reference_id",
            "decision_type",
            "reason",
            "public_message",
            "decided_by",
            "created_at",
            "is_active",
            "expected_review_date",
        ]
        
        
class AdminSolverTaskSerializer(serializers.ModelSerializer):
    solver_email = serializers.CharField(source="solver.email")


    class Meta:
        model = SolverTask
        fields = [
            "id",
            "reference_id",
            "status",
            "solver_email",
            "contact_email",
            "created_at",
            "specialization"
        ]
        
    
class CitizenEvidenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssueEvidence
        fields = [
            "id",
            "reference_id",
            "evidence_type",
            "cloudinary_url",
            "cloudinary_public_id",
            "file_format",
            "file_size",
            "width",
            "height",
            "created_at",
        ]
        
class AdminIssueDetailSerializer(serializers.ModelSerializer):
    reporter_mail = serializers.EmailField(source="reporter.email")
    category_name = serializers.CharField(source="category.name")

    evidences = CitizenEvidenceSerializer(many=True)

    administrative_decisions = AdminDecisionSerializer(many=True)
    solver_tasks = AdminSolverTaskSerializer(many=True)

    class Meta:
        model = Issue
        fields = [
            "id",
            "reference_id",
            "title",
            "description",
            "status",
            "reporter_mail",
            "category_name",
            "created_at",
            "evidences",
            # admin-only context
            "administrative_decisions",
            "solver_tasks",
        ]