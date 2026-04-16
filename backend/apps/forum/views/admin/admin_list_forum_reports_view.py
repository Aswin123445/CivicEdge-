from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsAdmin
from apps.forum.selectors.admin.get_forum_reports_selector import get_forum_reports
from apps.forum.serializers.admin.forum_report_list_serializer import ForumReportListSerializer


class AdminListForumReportsAPIView(ListAPIView):
    permission_classes = [IsAdmin]
    serializer_class = ForumReportListSerializer
    search_fields = [
        "reference_id",
        "target_type",
    ]
    ordering_fields = [
        "created_at",
    ]
    ordering = ["-created_at"] 
    def get_queryset(self):
        status = self.request.query_params.get("status")
        target_type = self.request.query_params.get("target_type")

        return get_forum_reports(
            status=status,
            target_type=target_type,
        )