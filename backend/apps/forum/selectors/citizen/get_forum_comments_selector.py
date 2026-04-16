

from apps.forum.models.forum_comment import ForumComment


def get_forum_comments(*, post_id):
    return (
        ForumComment.objects
        .filter(post_id=post_id, status="active", parent__isnull=True)
        .select_related("user")
        .order_by("-created_at")
    )