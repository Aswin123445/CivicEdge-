from apps.forum.models.forum_category import ForumCategory

def get_active_categories():
    return (
        ForumCategory.objects
        .filter(is_active=True)
        .only("id", "name")
        .order_by("name")
    )