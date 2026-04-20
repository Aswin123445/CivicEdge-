from apps.notification.models.notification import Notification
from apps.notification.services.notification_service import NotificationService
from shared.enums.user_role import UserRole
from apps.user.models import User

def handle_issue_reported(payload):
    issue = payload["issue"]
    actor = payload["actor"]

    admins = User.objects.filter(role = UserRole.ADMIN)

    notifications = [
        Notification(
            user=admin,
            type=Notification.Type.ISSUE_REPORTED,
            title="New Issue Reported",
            message=f"A new issue has been reported: {issue.title}",
            actor=actor,            
            target_type=Notification.TargetType.ISSUE ,
            target_id=issue.id,
            redirect_url=f"/admin/execution/in-review/issues"
        )
        for admin in admins
    ]

    NotificationService.bulk_create_notifications(notifications)