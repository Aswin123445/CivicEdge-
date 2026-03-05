from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.issue_execution.serilalizers.admin_issue_decision_serializer import AdminIssueDecisionCreateSerializer
from apps.issue_execution.services.admin_issue_decision_service import create_admin_issue_decision
from apps.issues.models.issues import Issue
from apps.user.permissions.user_permissions import IsAdmin




class AdminIssueDecisionView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, id):
        serializer = AdminIssueDecisionCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        issue = get_object_or_404(Issue, id=id)

        decision = create_admin_issue_decision(
            issue=issue,
            decided_by=request.user,
            data=serializer.validated_data,
        )

        return Response(
            {
                "decision_id": decision.id,
                "reference_id": decision.reference_id,
                "decision_type": decision.decision_type,
            },
            status=status.HTTP_201_CREATED,
        )