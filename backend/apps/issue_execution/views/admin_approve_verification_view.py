from django.shortcuts import get_object_or_404
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.issue_execution.models.field_verification_report import FieldVerificationReport
from apps.issue_execution.serilalizers.admin_verification_decision_serializer import AdminVerificationDecisionSerializer
from apps.issue_execution.services.admin_assign_contractor_service import assign_contractor_to_task
from apps.issue_execution.services.admin_verification_decision_service import create_verification_decision
from apps.issues.models.issue_administrative_decision import IssueAdministrativeDecision
from apps.user.permissions.user_permissions import IsAdmin




class AdminApproveVerificationView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, report_id):
        serializer = AdminVerificationDecisionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        report = get_object_or_404(
            FieldVerificationReport,
            id=report_id,
            is_active=True,
        )

        decision_type = serializer.validated_data["decision_type"]
        contractor_id = serializer.validated_data.get("contractor_id")

        # Business rule validation
        if decision_type == IssueAdministrativeDecision.DecisionType.APPROVED and not contractor_id:
            return Response(
                {"detail": "Contractor must be provided when approving verification."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        with transaction.atomic():

            decision = create_verification_decision(
                admin=request.user,
                report=report,
                data=serializer.validated_data,
            )

            if decision_type == IssueAdministrativeDecision.DecisionType.APPROVED:
                assign_contractor_to_task(
                    admin=request.user,
                    task=report.solver_task,
                    contractor_id=contractor_id,
                )


        return Response(
            {
                "detail": "Verification approved and contractor assigned successfully.",
                "decision_reference_id": decision.reference_id,
            },
            status=status.HTTP_201_CREATED,
        )