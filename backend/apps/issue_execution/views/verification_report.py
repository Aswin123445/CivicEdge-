from django.http import HttpResponse
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

from apps.issue_execution.services.verification_report_pdf_service import (
    generate_verification_report_pdf,
)
from apps.issue_execution.models.field_verification_report import (
    FieldVerificationReport,
)


class SolverVerificationReportPDFView(APIView):

    def get(self, request, report_id):

        report = get_object_or_404(
            FieldVerificationReport.objects.select_related(
                "solver_task",
                "solver_task__issue",
                "solver_task__solver",
            ),
            id=report_id,
            is_active=True,
        )

        pdf = generate_verification_report_pdf(report)

        response = HttpResponse(pdf, content_type="application/pdf")

        response["Content-Disposition"] = (
            f'attachment; filename="verification_report_{report.reference_id}.pdf"'
        )

        return response
