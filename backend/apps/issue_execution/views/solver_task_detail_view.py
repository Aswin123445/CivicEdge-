from rest_framework.generics import RetrieveAPIView


from apps.user.permissions.user_permissions import IsSolver
from apps.user.permissions.is_active_solver_for_write import IsActiveSolverForWrite
from apps.issue_execution.serilalizers.solver_task_detail_serializer import SolverTaskDetailSerializer
from apps.issue_execution.selectors.get_solver_task_detail import get_solver_task_detail

class SolverTaskDetailView(RetrieveAPIView):
    serializer_class = SolverTaskDetailSerializer
    permission_classes = [ IsSolver,IsActiveSolverForWrite ]
    lookup_url_kwarg = "task_id"

    def get_object(self):
        return get_solver_task_detail(
            task_id=self.kwargs["id"],
            solver=self.request.user,
        )