from apps.issues.models import IssueCategory
def get_category(*, category):
    return IssueCategory.objects.filter(id=category.id).first()