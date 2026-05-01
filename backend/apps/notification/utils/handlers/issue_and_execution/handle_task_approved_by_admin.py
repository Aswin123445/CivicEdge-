from apps.notification.models.notification import Notification
from apps.notification.services.notification_service import NotificationService
from apps.notification.services.realtime_notification_service import (
    RealtimeNotificationService,
)

def handle_task_approved_by_admin(payload):
    task = payload["task"]
    actor = payload["actor"]  

    solver = task.solver

    if not solver:
        return

    NotificationService.create_notification(
        user=solver,
        type=Notification.Type.TASK_APPROVED_BY_ADMIN,
        title="Task Approved",
        message=f"Your work for issue '{task.issue.title}' has been approved.",
        actor=actor,

        target_type=Notification.TargetType.TASK,
        target_id=task.id,
        redirect_url=f"/solver/task/{task.id}",
    )
    RealtimeNotificationService.push_unread_count(user=solver)
