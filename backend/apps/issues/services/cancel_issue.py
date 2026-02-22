from django.utils import timezone
from rest_framework.exceptions import ValidationError
from django.db import transaction

from apps.issues.models.issue_log import IssueLog
from apps.issues.utils.enums.issue_status import IssueStatus


@transaction.atomic
def cancel_issue(*, issue, user):
    """
    Cancels an OPEN issue by the reporting citizen.
    """

    if issue.status != IssueStatus.OPEN:
        raise ValidationError("Only open issues can be cancelled.")

    if issue.reporter_id != user.id:
        raise ValidationError("You are not allowed to cancel this issue.")

    issue.status = IssueStatus.CANCELLED
    issue.is_draft = False
    issue.cancelled_at = timezone.now()
    issue.save(update_fields=["status", "cancelled_at", "is_draft"])

    # ✅ Log the cancellation
    IssueLog.objects.create(
        issue=issue,
        event_type=IssueLog.EventType.CANCELLED,
        actor=user,
        metadata={
            "cancelled_at": issue.cancelled_at.isoformat(),
        },
    )

    return issue