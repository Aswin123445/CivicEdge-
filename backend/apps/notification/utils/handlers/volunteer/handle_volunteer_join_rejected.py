from apps.notification.models.notification import Notification
from apps.notification.services.notification_service import NotificationService


def handle_volunteer_join_rejected(payload):
    membership = payload["membership"]
    actor = payload["actor"]  # admin

    user = membership.user
    group = membership.group

    NotificationService.create_notification(
        user=user,
        type=Notification.Type.VOLUNTEER_JOIN_REJECTED,
        title="Volunteer Request Rejected",
        message=f"Your request to join the group '{group.name}' was rejected.",
        actor=actor,

        target_type=Notification.TargetType.VOLUNTEER,
        target_id=group.id,
        redirect_url=f"/volunteer-army/group/{group.id}",
    )