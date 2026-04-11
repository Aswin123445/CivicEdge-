from apps.notification.models.notification import Notification
from apps.notification.services.notification_service import NotificationService


def handle_task_rejected_by_admin(payload):
    task = payload["task"]
    actor = payload["actor"]  # admin

    solver = task.solver

    if not solver:
        return

    NotificationService.create_notification(
        user=solver,
        type=Notification.Type.TASK_REJECTED_BY_ADMIN,
        title="Submission Rejected",
        message=f"Your report for issue '{task.issue.title}' was rejected. Please review the feedback and resubmit.",
        actor=actor,

        target_type=Notification.TargetType.TASK,
        target_id=task.id,
        redirect_url=f"/solver/task/{task.id}",
    )