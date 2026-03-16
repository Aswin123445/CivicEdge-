from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView
from rest_framework.exceptions import ValidationError
from django.utils.timezone import now
from apps.issue_execution.models.solver_task import SolverTask
from apps.user.permissions.user_permissions import IsSolver 
from apps.user.permissions.is_active_solver_for_write import IsActiveSolverForWrite
from rest_framework.response import Response
from apps.issue_execution.selectors.solver_progress_selectors import (
    get_task_progress_updates,
)
from apps.issue_execution.serilalizers.solver_progress_update_serializer import SolverProgressUpdateSerializer


class SolverProgressUpdateListView(ListAPIView):
    permission_classes = [IsSolver, IsActiveSolverForWrite]
    serializer_class = SolverProgressUpdateSerializer
    pagination_class = None
    ordering = ["created_at"]

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
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset().order_by("-created_at")

        serializer = self.get_serializer(queryset, many=True)

        latest_percentage = None
        if queryset.exists():
            latest_percentage = queryset.first().progress_percentage

        return Response({
            "latest_progress_percentage": latest_percentage,
            "results": serializer.data
        })