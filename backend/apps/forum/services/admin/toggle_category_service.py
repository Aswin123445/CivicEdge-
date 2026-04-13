from rest_framework.exceptions import ValidationError
from apps.forum.selectors.admin.get_category_selector import get_category

def toggle_category(*, category_id):
    category = get_category(category_id=category_id)

    if not category:
        raise ValidationError("Category not found")

    category.is_active = not category.is_active
    category.save(update_fields=["is_active"])

    return category