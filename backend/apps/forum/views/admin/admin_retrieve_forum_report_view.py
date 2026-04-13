from rest_framework.generics import RetrieveAPIView
from rest_framework.exceptions import NotFound

from apps.user.permissions.user_permissions import IsAdmin

from apps.forum.selectors.admin.get_forum_report_detail_selector import get_forum_report_detail
from apps.forum.serializers.admin.forum_report_detail_serializer import ForumReportDetailSerializer


class AdminRetrieveForumReportAPIView(RetrieveAPIView):
    permission_classes = [ IsAdmin]
    serializer_class = ForumReportDetailSerializer
    lookup_field = "id"

    def get_object(self):
        report = get_forum_report_detail(
            report_id=self.kwargs.get("id")
        )

        if not report:
            raise NotFound("Report not found")

        return report