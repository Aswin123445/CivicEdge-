from apps.notification.models.notification import Notification
from apps.notification.services.notification_service import NotificationService


def handle_volunteer_join_approved(payload):
    membership = payload["membership"]
    actor = payload["actor"]  # admin

    user = membership.user
    group = membership.group

    NotificationService.create_notification(
        user=user,
        type=Notification.Type.VOLUNTEER_JOIN_APPROVED,
        title="Volunteer Membership Approved",
        message=f"You have been approved to join the group '{group.name}'.",
        actor=actor,

        target_type=Notification.TargetType.VOLUNTEER_APPROVED,
        target_id=group.id,
        redirect_url=f"/volunteer-army/group/{group.id}",
    )