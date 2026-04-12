from apps.forum.models import ForumPost

def get_forum_posts(*, category_id=None):
    qs = ForumPost.objects.filter(status="active")

    if category_id:
        qs = qs.filter(category_id=category_id)

    return qs.select_related("category", "user").prefetch_related("media")