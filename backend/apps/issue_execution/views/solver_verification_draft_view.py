from rest_framework.views import APIView
from rest_framework.response import Response
from apps.user.permissions.user_permissions import  IsSolver
from apps.user.permissions.is_active_solver_for_write import IsActiveSolverForWrite
from apps.issue_execution.models import SolverTask
from apps.issue_execution.serilalizers.verification_draft_serializer import FieldVerificationDraftSerializer
from apps.issue_execution.services.solver_verification_draft_service import get_or_create_verification_draft
class SolverVerificationDraftView(APIView):
    permission_classes = [
        IsSolver,
        IsActiveSolverForWrite,
    ]

    def get(self, request, id):
        solver_task = SolverTask.objects.get(
            id=id,
            solver=request.user,
            is_active=True,
        )

        draft = get_or_create_verification_draft(
            solver_task=solver_task,
            solver=request.user,
        )

        serializer = FieldVerificationDraftSerializer(draft)
        return Response(serializer.data)