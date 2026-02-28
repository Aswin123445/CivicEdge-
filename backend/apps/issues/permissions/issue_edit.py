from apps.issues.utils.enums.issue_status import IssueStatus
def build_issue_permissions(issue, decision, user):
    return {
        "can_cancel": (
            issue.status == IssueStatus.IN_REVIEW
            and decision is None
            and issue.reporter == user
        ),
        "can_edit": False,
    }