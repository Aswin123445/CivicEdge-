from apps.issues.models.issue_category import IssueCategory

def create_issue_category(*, data):
    category = IssueCategory.objects.create(**data)
    return category

def toggle_category(*, category):
    category.is_active = not category.is_active
    category.save(update_fields=["is_active"])
    return category