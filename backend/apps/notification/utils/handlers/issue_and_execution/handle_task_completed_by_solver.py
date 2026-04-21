from django.contrib.auth import get_user_model

from apps.notification.models.notification import Notification
from apps.notification.services.notification_service import NotificationService
from shared.enums.user_role import UserRole

User = get_user_model()


def get_admin_users():
    return User.objects.filter(role=UserRole.ADMIN, is_active=True).only("id")


def handle_task_completed_by_solver(payload):
    task = payload["task"]
    actor = payload["actor"]  # solver

    admins = get_admin_users()

    if not admins:
        return

    notifications = [
        {
            "user": admin,
            "type": Notification.Type.TASK_COMPLETED_BY_SOLVER,
            "title": "Task Completed",
            "message": f"{actor.email} has completed the task for issue: {task.issue.title}",
            "actor": actor,

            "target_type": Notification.TargetType.TASK,
            "target_id": task.id,
            "redirect_url": "/dashboard/execution/execution-proofs/",
        }
        for admin in admins
    ]

    NotificationService.bulk_create_notifications(
        [Notification(**n) for n in notifications]
    )