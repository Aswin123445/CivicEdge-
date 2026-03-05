from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsAdmin

from apps.issue_execution.selectors.admin_issue_selectors import get_issues_pending_initial_review
from apps.issue_execution.serilalizers.admin_issue_review_serializer import AdminIssueReviewSerializer




class AdminInitialIssueReviewListView(ListAPIView):
    """
    Lists issues that require initial admin review.
    """
    permission_classes = [IsAdmin]
    serializer_class = AdminIssueReviewSerializer

    def get_queryset(self):
        return get_issues_pending_initial_review()