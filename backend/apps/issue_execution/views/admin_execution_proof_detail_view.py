from rest_framework.generics import RetrieveAPIView 
from apps.user.permissions.user_permissions import IsAdmin
from apps.issue_execution.models.execution_proof import ExecutionProof
from apps.issue_execution.serilalizers.admin_execution_proof_detail_serializer import AdminExecutionProofDetailSerializer
class AdminExecutionProofDetailView(RetrieveAPIView):
    permission_classes = [IsAdmin]
    serializer_class = AdminExecutionProofDetailSerializer
    lookup_field = "id"              # model field
    lookup_url_kwarg = "proof_id" 
    def get_queryset(self):
        data =  (
            ExecutionProof.objects
            .select_related("solver_task__issue", "submitted_by")
            .prefetch_related("evidences","solver_task__progress_updates")
            .filter(is_active=True)
        ) 
        return data