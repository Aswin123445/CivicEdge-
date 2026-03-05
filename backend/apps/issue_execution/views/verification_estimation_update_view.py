from rest_framework.views import APIView
from rest_framework.response import Response

from apps.issue_execution.models import FieldVerificationDraft

from apps.user.permissions.user_permissions import IsSolver 
from apps.user.permissions.is_active_solver_for_write import IsActiveSolverForWrite 
from apps.issue_execution.serilalizers.verification_draft_serializer import FieldVerificationDraftSerializer
from apps.issue_execution.serilalizers.verification_estimation_serializer import VerificationEstimationUpdateSerializer
from apps.issue_execution.services.solver_verification_estimation_service import update_estimation_verification
from django.shortcuts import get_object_or_404  
class SolverVerificationEstimationUpdateView(APIView):
    permission_classes = [
        IsSolver,
        IsActiveSolverForWrite,
    ]

    def patch(self, request, draft_id):
        serializer = VerificationEstimationUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        draft = get_object_or_404(
            FieldVerificationDraft.objects.select_related("solver_task"),
            id=draft_id,
            is_active=True
        )
        draft = update_estimation_verification(
            draft=draft,
            solver=request.user,
            data=serializer.validated_data,
        )

        return Response(FieldVerificationDraftSerializer(draft).data)