from apps.forum.models import ForumCategory

def get_category(*, category_id):
    return ForumCategory.objects.filter(id=category_id).first()