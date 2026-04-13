from apps.forum.models import ForumCategory

def get_all_categories():
    return (
        ForumCategory.objects
        .all()
        .only("id", "name", "reference_id", "is_active", "created_at")
        .order_by("-created_at")
    )