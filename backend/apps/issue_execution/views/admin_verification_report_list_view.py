from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsAdmin
from apps.user.permissions.is_active_solver_for_write import IsActiveSolverForWrite
from apps.issue_execution.selectors.admin_verification_report_selectors import get_pending_verification_reports
from apps.issue_execution.serilalizers.admin_verification_report_list_serializer import AdminVerificationReportListSerializer


class AdminVerificationReportListView(ListAPIView):
    permission_classes = [IsAdmin, IsActiveSolverForWrite]
    serializer_class = AdminVerificationReportListSerializer

    def get_queryset(self):
        status = self.request.query_params.get("status")

        if status == "PENDING":
            return get_pending_verification_reports()

        # Future extension (DECIDED, ALL)
        return get_pending_verification_reports()