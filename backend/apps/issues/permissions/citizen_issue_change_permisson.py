from rest_framework.permissions import BasePermission
from apps.issues.utils.enums.issue_status import IssueStatus 

class IsComplaintOpen(BasePermission):
    message = "cannot update the complaint "

    def has_object_permission(self, request, view, obj):
        # obj = Complaint instance
        return obj.status == IssueStatus.OPEN or obj.status == IssueStatus.REOPENED
