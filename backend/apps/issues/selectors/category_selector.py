from apps.issues.models import IssueCategory

def get_issue_categories(*, is_active=None):
    queryset = IssueCategory.objects.all()

    if is_active is not None:
        queryset = queryset.filter(is_active=is_active)

    return queryset