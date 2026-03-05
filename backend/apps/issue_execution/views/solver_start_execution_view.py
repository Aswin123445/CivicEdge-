from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsSolver 
from apps.user.permissions.is_active_solver_for_write import IsActiveSolverForWrite
from apps.issue_execution.models.solver_task import SolverTask
from apps.issue_execution.services.solver_start_execution_service import (
    start_execution,
)


class SolverStartExecutionView(APIView):
    permission_classes = [IsSolver,IsActiveSolverForWrite]

    def post(self, request, task_id):

        task = get_object_or_404(
            SolverTask.objects.select_related(
                "issue",
                "contractor",
                "solver"
            ),
            id=task_id,
            is_active=True,
        )

        start_execution(
            solver=request.user,
            task=task,
        )

        return Response(
            {"detail": "Execution started successfully."},
            status=status.HTTP_200_OK,
        )