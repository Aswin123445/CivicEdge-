from rest_framework.generics import RetrieveAPIView

from apps.issue_execution.models.execution_proof import ExecutionProof
from apps.issue_execution.serilalizers.execution_evidence_serializer import SolverExecutionProofDetailSerializer


class SolverExecutionProofDetailView(RetrieveAPIView):

    serializer_class = SolverExecutionProofDetailSerializer
    lookup_field = "id"

    def get_queryset(self):
        return (
            ExecutionProof.objects
            .filter(submitted_by=self.request.user)
            .select_related("solver_task")
            .prefetch_related("evidences")
        )