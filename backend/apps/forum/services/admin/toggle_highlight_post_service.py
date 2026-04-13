from rest_framework.exceptions import ValidationError
from apps.forum.models.moderation_log import ModerationLog
from apps.forum.selectors.admin.get_forum_post_selector import get_forum_post



def toggle_highlight_post(*, moderator, post_id):
    post = get_forum_post(post_id=post_id)

    if not post:
        raise ValidationError("Post not found")

    old_state = post.is_highlighted

    # Toggle
    post.is_highlighted = not post.is_highlighted
    post.save(update_fields=["is_highlighted"])

    action = "highlight" if post.is_highlighted else "unhighlight"

    #  Log
    ModerationLog.objects.create(
        moderator=moderator,
        target_type="post",
        target_id=post.id,
        action=action,
        metadata={
            "previous_state": old_state,
            "new_state": post.is_highlighted,
        },
    )

    return post