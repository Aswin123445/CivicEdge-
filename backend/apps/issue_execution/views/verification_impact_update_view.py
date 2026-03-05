from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.user.permissions.user_permissions import IsSolver 
from apps.user.permissions.is_active_solver_for_write import IsActiveSolverForWrite
from apps.issue_execution.models import FieldVerificationDraft
from apps.issue_execution.serilalizers.verification_draft_serializer import FieldVerificationDraftSerializer
from apps.issue_execution.serilalizers.verification_impact_serializer import VerificationImpactUpdateSerializer
from apps.issue_execution.services.solver_verification_impact_service import update_impact_verification


class SolverVerificationImpactUpdateView(APIView):
    permission_classes = [
        IsSolver,
        IsActiveSolverForWrite,
    ]

    def patch(self, request, id):
        serializer = VerificationImpactUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        draft = get_object_or_404(
            FieldVerificationDraft.objects.select_related("solver_task"),
            id=id,
            is_active=True,
        )

        draft = update_impact_verification(
            draft=draft,
            solver=request.user,
            data=serializer.validated_data,
        )

        return Response(FieldVerificationDraftSerializer(draft).data)