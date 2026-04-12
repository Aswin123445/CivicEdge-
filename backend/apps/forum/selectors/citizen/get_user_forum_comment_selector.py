from apps.forum.models import ForumComment

def get_user_forum_comment(*, comment_id, user):
    return (
        ForumComment.objects
        .filter(id=comment_id, user=user)
        .select_related("user", "post")
        .first()
    )