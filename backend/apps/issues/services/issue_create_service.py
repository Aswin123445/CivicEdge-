from django.db import transaction
from apps.issues.models.issue_log import  IssueLog
from apps.issues.models.issues import Issue

@transaction.atomic
def create_draft_issue(*, user, data):
    issue = Issue.objects.create(
        title=data["title"],
        description=data["description"],
        category=data["category"],
        reporter=user,
        is_draft=True,
        draft_step=Issue.DraftStep.BASIC,
    )

    IssueLog.objects.create(
        issue=issue,
        event_type=IssueLog.EventType.CREATED,
        actor=user,
        metadata={
            "draft": True,
            "draft_step": Issue.DraftStep.BASIC,
        },
    )

    return issue