from rest_framework.generics import RetrieveAPIView
from apps.user.permissions.user_permissions import IsAdmin

from apps.issue_execution.selectors.get_admin_issue_detail import get_admin_issue_detail
from apps.issue_execution.serilalizers.admin_issue_detail_serializer import AdminIssueDetailSerializer


class AdminIssueDetailView(RetrieveAPIView):
    """
    Admin view of a single issue with full internal context.
    """
    permission_classes = [IsAdmin]
    serializer_class = AdminIssueDetailSerializer
    lookup_url_kwarg = "id"

    def get_object(self):
        return get_admin_issue_detail(self.kwargs["id"])