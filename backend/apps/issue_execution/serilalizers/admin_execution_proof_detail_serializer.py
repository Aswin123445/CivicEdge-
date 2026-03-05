from rest_framework import serializers

from apps.issue_execution.models.execution_proof import ExecutionProof
class AdminExecutionProofDetailSerializer(serializers.ModelSerializer):

    issue = serializers.SerializerMethodField()
    solver = serializers.SerializerMethodField()
    evidences = serializers.SerializerMethodField()
    progress = serializers.SerializerMethodField()
    
    

    class Meta:
        model = ExecutionProof
        fields = [
            "id",
            "reference_id",
            "submitted_at",
            "completion_summary",
            "deviations_from_plan",
            "remaining_issues",
            "issue",
            "solver",
            "evidences",
            "progress",
        ]

    def get_issue(self, obj):
        return {
            "reference_id": obj.solver_task.issue.reference_id,
            "title": obj.solver_task.issue.title,
            "status": obj.solver_task.issue.status,
        }

    def get_solver(self, obj):
        return {
            "id": obj.submitted_by.id,
            "email": obj.submitted_by.email,
        }

    def get_evidences(self, obj):
        return [
            {
                "secure_url": e.secure_url,
                "resource_type": e.resource_type,
            }
            for e in obj.evidences.filter(is_active=True)
        ]
        
    def get_progress(self, obj):
        return [
            {
                "progress_summary": e.progress_summary,
                "progress_percentage": e.progress_percentage,
                "reference_id": e.reference_id,
                "created_at": e.created_at,
                "blockers": e.blockers,
                "next_steps": e.next_steps
            }
            for e in obj.solver_task.progress_updates.filter(is_active=True)
        ]