from apps.forum.models.forum_category import ForumCategory
def get_category(*, category):
    return ForumCategory.objects.filter(id=category).first()
