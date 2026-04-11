
from apps.notification.models.notification import Notification
from apps.notification.services.notification_service import NotificationService


def handle_issue_resolved(payload):
    issue = payload["issue"]
    actor = payload["actor"]  # admin

    citizen = issue.reporter

    if not citizen:
        return

    NotificationService.create_notification(
        user=citizen,
        type=Notification.Type.ISSUE_RESOLVED,
        title="Issue Resolved",
        message=f"Your reported issue '{issue.title}' has been resolved.",
        actor=actor,

        target_type=Notification.TargetType.RESOLVED_ISSUE,
        target_id=issue.id,
        redirect_url=f"/complaints/{issue.id}", 
    )