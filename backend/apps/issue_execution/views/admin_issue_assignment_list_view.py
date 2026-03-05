from rest_framework.generics import ListAPIView

from apps.user.permissions.user_permissions import IsAdmin
from apps.issue_execution.serilalizers.admin_issue_assignment_list_serializer import AdminIssueAssignmentListSerializer
from apps.issue_execution.selectors.get_issues_pending_solver_assignment import get_issues_pending_solver_assignment



class AdminIssueSolverAssignmentListView(ListAPIView):
    permission_classes = [IsAdmin]
    serializer_class = AdminIssueAssignmentListSerializer

    def get_queryset(self):
        return get_issues_pending_solver_assignment()