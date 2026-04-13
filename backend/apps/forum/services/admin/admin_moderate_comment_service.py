from rest_framework.exceptions import ValidationError
from apps.forum.selectors.admin.get_forum_comment_selector import get_forum_comment
from apps.forum.models.moderation_log import ModerationLog


def admin_moderate_comment(*, moderator, comment_id, data):
    action = data["action"]
    reason = data.get("reason", "")

    comment = get_forum_comment(comment_id=comment_id)

    if not comment:
        raise ValidationError("Comment not found")

    old_status = comment.status

    #  Moderation actions
    if action == "hide":
        if comment.status == 'hidden':
            raise ValidationError("Comment already hidden")
        comment.change_status("hidden")

    elif action == "remove":
        if comment.status == 'removed':
            raise ValidationError("Comment already removed")
        comment.change_status("removed")

    elif action == "restore":
        if comment.status == 'active':
            raise ValidationError("Comment already active")
        comment.change_status("active")

    else:
        raise ValidationError("Invalid action")

    #  Log action
    ModerationLog.objects.create(
        moderator=moderator,
        target_type="comment",
        target_id=comment.id,
        action=action,
        reason=reason,
        metadata={
            "previous_status": old_status,
            "new_status": comment.status,
        },
    )

    return comment