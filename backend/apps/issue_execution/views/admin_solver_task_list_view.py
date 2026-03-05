from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsAdmin
from apps.issue_execution.selectors.admin_solver_task_selectors import get_solver_tasks_by_status
from apps.issue_execution.serilalizers.admin_solver_task_list_serializer import AdminSolverTaskListSerializer
from rest_framework.exceptions import ValidationError

from apps.issue_execution.utils.enums.solver_task_status import SolverTaskStatus


class AdminSolverTaskListView(ListAPIView):
    permission_classes = [IsAdmin]
    serializer_class = AdminSolverTaskListSerializer

    def get_queryset(self):
        status_param = self.request.query_params.get("status")

        if status_param and status_param not in SolverTaskStatus.values:
            raise ValidationError("Invalid status filter.")

        return get_solver_tasks_by_status(status=status_param if status_param else None)