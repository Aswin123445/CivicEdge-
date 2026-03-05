from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsSolver 
from apps.user.permissions.is_active_solver_for_write import IsActiveSolverForWrite

from apps.issue_execution.services.solver_progress_update_service import (
    create_progress_update,
)
from apps.issue_execution.models.solver_task import SolverTask
from apps.issue_execution.serilalizers.solver_progress_update_serializer import SolverProgressUpdateSerializer


class SolverProgressUpdateView(APIView):
    permission_classes = [IsSolver, IsActiveSolverForWrite]

    def post(self, request, task_id):

        task = get_object_or_404(
            SolverTask.objects.select_related("solver"),
            id=task_id,
            is_active=True,
        )

        serializer = SolverProgressUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        progress = create_progress_update(
            solver=request.user,
            task=task,
            data=serializer.validated_data,
        )

        return Response(
            SolverProgressUpdateSerializer(progress).data,
            status=status.HTTP_201_CREATED,
        )