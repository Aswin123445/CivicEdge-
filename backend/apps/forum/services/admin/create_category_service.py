from rest_framework.exceptions import ValidationError
from apps.forum.models.forum_category import ForumCategory

def create_category(*, data):
    name = data["name"]


    # ensure uniqueness
    if ForumCategory.objects.filter(name=name).exists():
        raise ValidationError("Category with similar name already exists")

    category = ForumCategory.objects.create(
        name=name,
        is_active=True,
    )

    return category