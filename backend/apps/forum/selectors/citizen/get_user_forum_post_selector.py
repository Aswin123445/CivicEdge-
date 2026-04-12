
from apps.forum.models.forum_post import ForumPost

def get_user_forum_post(*, post_id, user):
    return (
        ForumPost.objects
        .filter(id=post_id, user=user)
        .select_related("category")
        .first()
    )