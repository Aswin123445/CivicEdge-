from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from rest_framework.exceptions import ValidationError

from apps.issue_execution.models.solver_task import SolverTask
from apps.user.permissions.user_permissions import IsSolver 
from apps.user.permissions.is_active_solver_for_write import IsActiveSolverForWrite
from apps.issue_execution.selectors.solver_progress_selectors import (
    get_task_progress_updates,
)
from apps.issue_execution.serilalizers.solver_progress_update_serializer import SolverProgressUpdateSerializer


class SolverProgressUpdateListView(ListAPIView):
    permission_classes = [IsSolver, IsActiveSolverForWrite]
    serializer_class = SolverProgressUpdateSerializer

    def get_queryset(self):
        task_id = self.kwargs.get("task_id")

        task = get_object_or_404(
            SolverTask.objects.select_related("solver"),
            id=task_id,
            is_active=True,
        )

        if task.solver_id != self.request.user.id:
            raise ValidationError("You are not assigned to this task.")

        return get_task_progress_updates(task=task)