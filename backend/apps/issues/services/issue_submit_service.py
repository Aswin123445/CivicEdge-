# apps/issues/services/issue_submit_service.py
from django.db import transaction
from rest_framework.exceptions import ValidationError, PermissionDenied

from apps.issues.models.issues import Issue
from apps.issues.models.issue_log import IssueLog
from apps.issues.utils.enums.issue_status import IssueStatus
from apps.issues.services.timeline_service import add_issue_timeline_event
from apps.notification.services.dispatcher import NotificationDispatcher
from apps.notification.utils.event_constants import NotificationEvent
from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity


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

    issue.is_draft = False
    issue.draft_step = Issue.DraftStep.REVIEW
    issue.status = IssueStatus.IN_REVIEW
    issue.save(update_fields=["is_draft", "draft_step","status"])

    IssueLog.objects.create(
        issue=issue,
        actor=user,
        event_type=IssueLog.EventType.CREATED,
        metadata={
            "submitted_by": str(user.id),
        },
    )
    add_issue_timeline_event(
        issue=issue,
        message="Issue submitted successfully. Your report is now under review.",
        created_by=user,
    )
    create_activity(
        user=user,
        entity=ActivityEntity.ISSUE,
        action=ActivityAction.CREATED,
        message=f"Issue {issue.title} created successfully",
    )

    def after_commit():
        NotificationDispatcher.dispatch(
            event=NotificationEvent.ISSUE_REPORTED,
            payload={"issue": issue, "actor": user},
        )
    transaction.on_commit(after_commit)

    return issue
