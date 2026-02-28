from apps.issues.models.issues import Issue
from apps.issues.utils.enums.issue_status import IssueStatus

def get_issue_home_counts(*, user):
    return {
        "draft_count": Issue.objects.filter(
            reporter=user,
            is_draft=True,
            is_active=True
        ).count(),

        "submitted_count": Issue.objects.filter(
            reporter=user,
            is_active=True
        ).exclude(is_draft=True).count(),

        "awaiting_review_count": Issue.objects.filter(
            reporter=user,
            is_active=True,
            status=IssueStatus.IN_REVIEW
        ).count(),
    }