from apps.notification.services.notification_service import NotificationService
from apps.notification.models.notification import Notification
from apps.notification.services.realtime_notification_service import (
    RealtimeNotificationService,
)

def handle_volunteer_certificate_generated(payload):
    parcipation = payload["parcipation"]
    user = payload["parcipation"].membership.user
    actor = payload["actor"]  # admin
    NotificationService.create_notification(
        user=user,
        type=Notification.Type.VOLUNTEER_CERTIFICATE,
        title="Certificate Generated",
        message=f"Congragulations! Your certificate for the event {parcipation.event.title} has been generated.",
        actor=actor,

        target_type=Notification.TargetType.VOLUNTEER,
        target_id=parcipation.id,
        redirect_url=f"/volunteer-army/certificate/{parcipation.recognition.id}/verify", 
    )
    RealtimeNotificationService.push_unread_count(user=user)
