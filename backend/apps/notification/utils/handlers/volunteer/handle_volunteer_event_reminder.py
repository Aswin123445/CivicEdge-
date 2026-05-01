from apps.notification.models.notification import Notification
from apps.notification.services.notification_service import NotificationService
from apps.notification.services.realtime_notification_service import (
    RealtimeNotificationService,
)

def handle_volunteer_event_reminder(payload):
    event = payload["event"]

    participants = event.participants.all()

    notifications = [
        {
            "user": user,
            "type": Notification.Type.VOLUNTEER_EVENT_REMINDER,
            "title": "Event Reminder",
            "message": f"Reminder: The event '{event.title}' starts soon.",
            "actor": None,  # system

            "target_type":Notification.TargetType.VOLUNTEER,
            "target_id":event.id,
            "redirect_url":f"/volunteer-army/{event.group.id}/events/{event.id}",

        }
        for user in participants
    ]

    NotificationService.bulk_create_notifications(
        [Notification(**n) for n in notifications]
    )
    RealtimeNotificationService.push_unread_count_many(users=participants)
