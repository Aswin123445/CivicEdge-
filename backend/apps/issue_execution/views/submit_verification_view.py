from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsSolver
from apps.user.permissions.is_active_solver_for_write import IsActiveSolverForWrite
from apps.issue_execution.models.solver_task import SolverTask
from apps.issue_execution.services.solver_submit_verification_service import submit_field_verification
from django.shortcuts import get_object_or_404


class SolverSubmitVerificationView(APIView):
    """
    Submit completed field verification to admin.
    """
    permission_classes = [
        IsSolver,
        IsActiveSolverForWrite,
    ]

    def post(self, request, task_id):
        task = get_object_or_404(
            SolverTask,
            id=task_id,
            is_active=True,
        )

        report = submit_field_verification(
            solver=request.user,
            task=task,
        )

        return Response(
            {
                "detail": "Verification submitted successfully.",
                "report_reference_id": report.reference_id,
            },
            status=status.HTTP_201_CREATED,
        )