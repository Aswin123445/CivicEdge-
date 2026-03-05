from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsSolver 
from apps.user.permissions.is_active_solver_for_write import IsActiveSolverForWrite
from apps.issue_execution.models.solver_task import SolverTask
from apps.issue_execution.serilalizers.solver_submit_completion_serializer import SolverSubmitCompletionSerializer
from apps.issue_execution.services.solver_submit_completion_service import submit_completion 
from django.shortcuts import get_object_or_404
class SolverSubmitCompletionView(APIView):
    permission_classes = [IsSolver, IsActiveSolverForWrite]

    def post(self, request, task_id):

        task = get_object_or_404(
            SolverTask.objects.select_related("solver"),
            id=task_id,
            is_active=True,
        )

        serializer = SolverSubmitCompletionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        proof = submit_completion(
            solver=request.user,
            task=task,
            data=serializer.validated_data,
        )

        return Response(
            {
                "detail": "Completion submitted successfully.",
                "proof_reference_id": proof.reference_id,
            },
            status=status.HTTP_201_CREATED,
        )