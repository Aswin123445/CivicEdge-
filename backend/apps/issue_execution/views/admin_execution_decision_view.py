from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.user.permissions.user_permissions import IsAdmin
from apps.issue_execution.serilalizers.admin_execution_decision_serializer import AdminExecutionDecisionSerializer
from apps.issue_execution.services.admin_execution_decision_service import review_execution_completion
from apps.issue_execution.models.execution_proof import ExecutionProof


class AdminExecutionDecisionView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, proof_id):

        proof = get_object_or_404(
            ExecutionProof.objects.select_related(
                "solver_task__issue"
            ),
            id=proof_id,
            is_active=True,
        )

        serializer = AdminExecutionDecisionSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)

        result = review_execution_completion(
            admin=request.user,
            proof=proof,
            data=serializer.validated_data,
        )

        return Response(
            result,
            status=status.HTTP_200_OK,
        )