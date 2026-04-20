from apps.notification.services.notification_service import NotificationService
from apps.notification.models.notification import Notification


def handle_forum_comment(payload):
    actor = payload["actor"] 
    comment = payload["comment"]
    citizen = comment.post.user
    NotificationService.create_notification(
        user=citizen,
        type=Notification.Type.FORUM_REPLY_RECEIVED,
        title="new comment",
        message=f"{actor.profile.name if actor.profile.name else actor.email.split('@')[0]} commented on your post",
        actor=actor,

        target_type=Notification.TargetType.FORUM,
        target_id=comment.id,
        redirect_url=f"/forum/posts/{comment.post.id}", 
    )