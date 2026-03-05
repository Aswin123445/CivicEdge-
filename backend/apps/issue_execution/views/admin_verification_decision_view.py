from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsAdmin
from apps.issue_execution.models.field_verification_report import FieldVerificationReport
from apps.issue_execution.serilalizers.admin_verification_decision_serializer import AdminVerificationDecisionSerializer
from apps.issue_execution.services.admin_verification_decision_service import create_verification_decision




class AdminVerificationDecisionView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, report_id):
        serializer = AdminVerificationDecisionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)


        report = get_object_or_404(
            FieldVerificationReport,
            id=report_id,
            is_active=True,
        )

        decision = create_verification_decision(
            admin=request.user,
            report=report,
            data=serializer.validated_data,
        )

        return Response(
            {
                "detail": "Verification decision recorded.",
                "decision_reference_id": decision.reference_id,
            },
            status=status.HTTP_201_CREATED,
        )