# apps/notifications/services/handlers/task_handlers.py

from apps.notification.models.notification import Notification
from apps.notification.services.notification_service import NotificationService


def handle_task_assigned(payload):
    task = payload["task"]
    actor = payload["actor"]

    solver = task.solver

    if not solver:
        return  

    NotificationService.create_notification(
        user=solver,
        type=Notification.Type.TASK_ASSIGNED_TO_SOLVER,
        title="New Task Assigned",
        message=f"You have been assigned a new task for issue: {task.issue.title}",
        actor=actor,

        target_type=Notification.TargetType.TASK,
        target_id=task.id,
        redirect_url=f"/solver/task/{task.id}",
    )
