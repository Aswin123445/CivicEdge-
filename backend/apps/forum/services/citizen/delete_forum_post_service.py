from apps.forum.models.forum_post import PostStatus
from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity


def delete_forum_post(*, post):
    if post.status == PostStatus.REMOVED:
        return post  

    post.change_status(PostStatus.REMOVED)
    create_activity(
        user=post.user,
        entity=ActivityEntity.FORUM,
        action=ActivityAction.CLOSED,
        message=f"Post {post.title} removed",
    )

    return post