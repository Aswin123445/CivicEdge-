from rest_framework.generics import RetrieveAPIView
from apps.user.permissions.user_permissions import IsAdmin
from apps.issue_execution.serilalizers.admin_verification_report_detail_serializer import AdminVerificationReportDetailSerializer
from apps.issue_execution.selectors.get_verification_report_for_admin import get_verification_report_for_admin




class AdminVerificationReportDetailView(RetrieveAPIView):
    permission_classes = [IsAdmin]
    serializer_class = AdminVerificationReportDetailSerializer
    lookup_url_kwarg = "report_id"

    def get_object(self):
        return get_verification_report_for_admin(
            report_id=self.kwargs["report_id"]
        )