from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import  IsSolver
from apps.user.permissions.is_active_solver_for_write import IsActiveSolverForWrite
from apps.issue_execution.selectors.solver_task_selectors import get_solver_tasks
from apps.issue_execution.serilalizers.solver_task_list_serializer import SolverTaskListSerializer
 # assuming you have this


class SolverTaskListView(ListAPIView):
    serializer_class = SolverTaskListSerializer
    permission_classes = [IsSolver, IsActiveSolverForWrite]

    def get_queryset(self):
        return get_solver_tasks(solver=self.request.user)