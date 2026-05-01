from apps.notification.models.notification import Notification
from apps.notification.services.notification_service import NotificationService
from apps.notification.services.realtime_notification_service import (
    RealtimeNotificationService,
)

def handle_approve_report(payload):
    task = payload["task"]
    actor = payload["actor"]  # admin

    solver = task.solver

    if not solver:
        return

    NotificationService.create_notification(
        user=solver,
        type=Notification.Type.APPROVE_REPORT,
        title="Approved Report",
        message=f"Reported task for the issue '{task.issue.title}' has been approved. Please Monitor the progress",
        actor=actor,

        target_type=Notification.TargetType.ISSUE,
        target_id=task.id,
        redirect_url=f"/solver/task/{task.id}", 
    )
    RealtimeNotificationService.push_unread_count(user = solver)
