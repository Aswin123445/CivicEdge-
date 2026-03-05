from rest_framework.generics import ListAPIView
from apps.issue_execution.selectors.solver_execution_proof_list_service import SolverExecutionProofListselector
from apps.issue_execution.serilalizers.solver_execution_proof_list_serializer import SolverExecutionProofListSerializer
from apps.user.permissions.user_permissions import IsSolver  

class SolverExecutionProofListView(ListAPIView):
    serializer_class = SolverExecutionProofListSerializer
    permission_classes = [IsSolver]

    def get_queryset(self):
        return SolverExecutionProofListselector.get_execution_proof_list(self.request.user)