from apps.notification.services.notification_service import NotificationService
from apps.notification.models.notification import Notification
from apps.forum.models.forum_reaction import ForumReaction
from apps.notification.services.realtime_notification_service import (
    RealtimeNotificationService,
)

def handle_forum_reaction(payload):
    actor = payload["actor"] 
    post = payload["post"]
    citizen = post.user
    count = ForumReaction.objects.filter(post=post).count()
    NotificationService.create_notification(
        user=citizen,
        type=Notification.Type.FORUM_REACTED,
        title="new reaction on the post",
        message=f"{actor.profile.name if actor.profile.name else actor.email.split('@')[0]} and {count - 1} others reacted on your post",
        actor=actor,

        target_type=Notification.TargetType.FORUM,
        target_id=post.id,
        redirect_url=f"/forum/posts/{post.id}", 
    )
    RealtimeNotificationService.push_unread_count(user=citizen)
