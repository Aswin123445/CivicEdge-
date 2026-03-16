from apps.user.permissions.user_permissions import IsAdmin
from rest_framework.generics import ListAPIView
from apps.issue_execution.serilalizers.admin_execution_proof_list_serializer import AdminExecutionProofListSerializer
from apps.issue_execution.selectors.get_pending_execution_proofs import get_pending_execution_proofs
class AdminPendingExecutionProofListView(ListAPIView):
    permission_classes = [IsAdmin]
    serializer_class = AdminExecutionProofListSerializer


    def get_queryset(self):
        return get_pending_execution_proofs()
    
    
