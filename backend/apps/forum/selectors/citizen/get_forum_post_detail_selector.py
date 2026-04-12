from django.db.models import Count

from apps.forum.models.forum_post import ForumPost

def get_forum_post_detail(*, post_id):
    return (
        ForumPost.objects
        .filter(id=post_id, status="active")
        .select_related("category", "user")
        .prefetch_related("media")
        .annotate(comments_count=Count("comments"))
        .first()
    )