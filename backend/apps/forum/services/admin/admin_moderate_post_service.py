from rest_framework.exceptions import ValidationError
from apps.forum.selectors.admin.get_forum_post_selector import get_forum_post
from apps.forum.models.moderation_log import ModerationLog


def admin_moderate_post(*, moderator, post_id, data):
    action = data["action"]
    reason = data.get("reason", "")

    post = get_forum_post(post_id=post_id)

    if not post:
        raise ValidationError("Post not found")

    old_status = post.status

    if action == "hide":
        if post.status == "hidden":
            raise ValidationError("Post already hidden")
        post.change_status("hidden")

    elif action == "remove":
        if post.status == "removed":
            raise ValidationError("Post already removed")
        post.change_status("removed")

    elif action == "restore":
        if post.status == "active":
            raise ValidationError("Post already active")
        post.change_status("active")

    else:
        raise ValidationError("Invalid action")

    #  Create moderation log
    ModerationLog.objects.create(
        moderator=moderator,
        target_type="post",
        target_id=post.id,
        action=action,
        reason=reason,
        metadata={
            "previous_status": old_status,
            "new_status": post.status,
        },
    )

    return post