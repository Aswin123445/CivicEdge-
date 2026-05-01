from apps.notification.models.notification import Notification
from apps.notification.services.notification_service import NotificationService
from apps.notification.services.realtime_notification_service import (
    RealtimeNotificationService,
)


def handle_noitfy_event(payload):
    event = payload["event"]
    actor = payload["actor"]  # admin

    memberships = event.group.memberships.all()

    notifications = [
        Notification(
            user=membership.user,
            type=Notification.Type.NEW_EVENT_NOTIFY,
            title="New event has been created ",
            message=f"A new event has been created: In your group {membership.group.name}",
            actor=actor,
            target_type=Notification.TargetType.VOLUNTEER,
            target_id=membership.group.id,
            redirect_url=f"/volunteer-army/{membership.group.id}/events",
        )
        for membership in memberships
    ]
    NotificationService.bulk_create_notifications(notifications)
    users = [membership.user for membership in memberships]
    RealtimeNotificationService.push_unread_count_many(users=users)
