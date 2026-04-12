from rest_framework.exceptions import ValidationError

from apps.forum.models.forum_comment import CommentStatus

def update_forum_comment(*, comment, data):
    if comment.status == CommentStatus.REMOVED:
        raise ValidationError("Cannot update a removed comment")

    comment.content = data["content"]
    comment.save(update_fields=["content", "updated_at"])

    return comment