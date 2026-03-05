from apps.issues.models.issue_timeline_event import IssueTimelineEvent


def add_issue_timeline_event(*, issue, message, created_by=None):
    """
    Create a timeline entry for an issue lifecycle event.
    """

    return IssueTimelineEvent.objects.create(
        issue=issue,
        message=message,
        created_by=created_by,
    )