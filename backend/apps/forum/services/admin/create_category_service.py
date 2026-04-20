from rest_framework.exceptions import ValidationError
from apps.forum.models.forum_category import ForumCategory
from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity

def create_category(*, data,by):
    name = data["name"]


    # ensure uniqueness
    if ForumCategory.objects.filter(name=name).exists():
        raise ValidationError("Category with similar name already exists")

    category = ForumCategory.objects.create(
        name=name,
        is_active=True,
    )
    create_activity(
        user=by,
        entity=ActivityEntity.FORUM,
        action=ActivityAction.MODERATED,
        message=f"Category {category.name} created successfully",
    )

    return category