from apps.notification.models.notification import Notification
from apps.notification.services.notification_service import NotificationService
from apps.notification.services.realtime_notification_service import (
    RealtimeNotificationService,
)


def handle_volunteer_attendance_reject(payload):
    parcipation = payload["parcipation"]
    actor = payload["actor"]  # admin

    user = parcipation.membership.user

    NotificationService.create_notification(
        user=user,
        type=Notification.Type.VOLUNTEER_ATTENDANCE_REJECT,
        title="Attendance Proof Rejected",
        message=f"Your submittd proof for the event '{parcipation.event.title}' was rejected.",
        actor=actor,
        target_type=Notification.TargetType.VOLUNTEER,
        target_id=parcipation.id,
        redirect_url=f"/volunteer-army/{parcipation.membership.group.id}/events/{parcipation.event.id}",
    )
    RealtimeNotificationService.push_unread_count(user=user)
