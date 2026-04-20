from apps.notification.services.notification_service import NotificationService
from apps.notification.models.notification import Notification


def handle_forum_report(payload):
    actor = payload["actor"] 
    report = payload["report"]
    citizen = report.reported_by
    NotificationService.create_notification(
        user=citizen,
        type=Notification.Type.FORUM_REPORT_USER,
        title="Took action on the report",
        message="Your report has been successfully processed",
        actor=actor,

        target_type=Notification.TargetType.FORUM,
        target_id=report.id,
        redirect_url="/forum/", 
    )