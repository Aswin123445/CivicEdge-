
from apps.user.models import User
from apps.notification.models.notification import Notification
from apps.notification.services.notification_service import NotificationService
from shared.enums.user_role import UserRole
def get_admin_users():
    return User.objects.filter(role=UserRole.ADMIN, is_active=True).only("id")


def handle_report_submitted_to_admin(payload):
    report = payload["report"]
    actor = payload["actor"]  

    admins = get_admin_users()

    if not admins:
        return

    notifications = [
        {
            "user": admin,
            "type": Notification.Type.REPORT_SUBMITTED_TO_ADMIN,
            "title": "Report Submitted",
            "message": f"{actor.email} submitted a report for issue: {report.solver_task.issue.title}",
            "actor": actor,

            "target_type": Notification.TargetType.REPORT,
            "target_id": report.id,
            "redirect_url": f"/dashboard/execution/verification-report/{report.id}",

        }
        for admin in admins
    ]

    NotificationService.bulk_create_notifications(
        [Notification(**n) for n in notifications]
    )