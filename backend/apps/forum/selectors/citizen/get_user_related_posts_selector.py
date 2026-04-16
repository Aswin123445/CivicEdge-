from django.db.models import Q

from apps.forum.models.forum_post import ForumPost
from apps.forum.models.forum_comment import ForumComment
from apps.forum.models.forum_reaction import ForumReaction

def get_user_related_posts(*, user_id):
    # posts created by user

    # posts commented on
    commented_post_ids = ForumComment.objects.filter(
        user_id=user_id,
        status="active"
    ).values_list("post_id", flat=True)

    # posts reacted to
    reacted_post_ids = ForumReaction.objects.filter(
        user_id=user_id
    ).values_list("post_id", flat=True)

    # combine all post ids
    post_ids = set(commented_post_ids) | set(reacted_post_ids) 

    return (
        ForumPost.objects
        .filter(
            Q(user_id=user_id) | Q(id__in=post_ids),
            status="active"
        )
        .select_related("category", "user")
        .prefetch_related("media")
        .distinct()
        .order_by("-created_at")
    )