# apps/issues/services/issue_submit_service.py
from django.db import transaction
from rest_framework.exceptions import ValidationError, PermissionDenied

from apps.issues.models.issues import Issue
from apps.issues.models.issue_log import IssueLog
from apps.issues.utils.enums.issue_status import IssueStatus


@transaction.atomic
def submit_issue(*, issue: Issue, user):
    """
    Final submission of a draft issue.
    """
    if issue.DraftStep.BEHAVIOR != issue.draft_step:
        raise PermissionDenied("Not allowed to perform this action.")

    if not issue.is_draft:
        raise ValidationError("Issue is already submitted.")

    if issue.reporter != user:
        raise PermissionDenied("You cannot submit this issue.")

    # 🔒 Lock the issue
    issue.is_draft = False
    issue.draft_step = Issue.DraftStep.REVIEW
    issue.status = IssueStatus.IN_REVIEW
    issue.save(update_fields=["is_draft", "draft_step","status"])

    # 🧾 Log submission
    IssueLog.objects.create(
        issue=issue,
        actor=user,
        event_type=IssueLog.EventType.CREATED,
        metadata={
            "submitted_by": str(user.id),
        },
    )

    return issue