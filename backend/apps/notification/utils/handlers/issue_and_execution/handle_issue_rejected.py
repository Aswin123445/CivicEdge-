from apps.notification.models.notification import Notification
from apps.notification.services.notification_service import NotificationService
from apps.notification.services.realtime_notification_service import (
    RealtimeNotificationService,
)

def handle_issue_rejected(payload):
    issue = payload["issue"]
    actor = payload["actor"]  # admin

    citizen = issue.reporter

    if not citizen:
        return

    NotificationService.create_notification(
        user=citizen,
        type=Notification.Type.ISSUE_REJECTED,
        title="Issue Rejected",
        message=f"Your reported issue '{issue.title}' has been rejected after.",
        actor=actor,

        target_type=Notification.TargetType.ISSUE,
        target_id=issue.id,
        redirect_url=f"/complaints/{issue.id}", 
    )
    RealtimeNotificationService.push_unread_count(user=citizen)
