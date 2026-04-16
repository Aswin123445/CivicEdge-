from apps.forum.models.forum_post import ForumPost

def get_admin_posts(*, status=None, category_id=None, user_id=None):
    qs = (
        ForumPost.objects
        .select_related("user", "category")
        .prefetch_related("media")
    )

    if status:
        qs = qs.filter(status=status)

    if category_id:
        qs = qs.filter(category_id=category_id)

    if user_id:
        qs = qs.filter(user_id=user_id)

    return qs.order_by("-created_at")