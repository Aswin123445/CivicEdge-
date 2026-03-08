from apps.issues.models.issues import Issue
from apps.issues.utils.enums.issue_status import IssueStatus


def get_issues_pending_initial_review():
    """
    Returns issues that require initial admin validation
    (submitted by citizen, but not yet assigned to solver).
    """
    return (
        Issue.objects
        .filter(status=IssueStatus.IN_REVIEW)
        .filter(solver_tasks__isnull=True)
        .filter(administrative_decisions__isnull=True)
        .select_related("reporter", "category")
        .order_by("-created_at")
    )