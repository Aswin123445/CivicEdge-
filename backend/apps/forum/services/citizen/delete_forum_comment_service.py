from apps.forum.models.forum_comment import CommentStatus

def delete_forum_comment(*, comment):
    # idempotent behavior
    if comment.status == CommentStatus.REMOVED:
        return comment

    # use model state transition
    comment.change_status(CommentStatus.REMOVED)

    return comment