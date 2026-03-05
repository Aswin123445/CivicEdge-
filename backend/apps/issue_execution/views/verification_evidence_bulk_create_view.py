from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsSolver
from apps.user.permissions.is_active_solver_for_write import IsActiveSolverForWrite

from apps.issue_execution.models.field_verification_draft import FieldVerificationDraft
from apps.issue_execution.serilalizers.verification_evidence_serializer import VerificationEvidenceBulkCreateSerializer
from apps.issue_execution.services.solver_verification_evidence_service import add_verification_evidence_bulk
from django.shortcuts import get_object_or_404


class SolverVerificationEvidenceBulkCreateView(APIView):
    """
    Bulk upload Cloudinary evidence for a verification draft.
    """
    permission_classes = [
        IsSolver,
        IsActiveSolverForWrite,
    ]

    def post(self, request, draft_id):
        serializer = VerificationEvidenceBulkCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        draft = get_object_or_404(FieldVerificationDraft, id=draft_id, is_active=True)

        add_verification_evidence_bulk(
            draft=draft,
            solver=request.user,
            evidences=serializer.validated_data["evidences"],
        )

        return Response(
            {"detail": "Evidence uploaded successfully."},
            status=status.HTTP_201_CREATED,
        )