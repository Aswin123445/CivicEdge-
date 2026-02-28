from apps.issues.models.issues import Issue


def get_citizen_complaints_queryset(*, user):
    """
    Returns queryset for citizen complaint list page.
    - Non-draft issues only
    - Belongs to requesting user
    - Optimized for list view
    """
    return (
        Issue.objects
        .filter(
            reporter=user,
            is_draft=False,
            is_active=True
        )
        .select_related(
            "category",
            "location",
        )
        .prefetch_related(
            "administrative_decisions",
        )
        .order_by("-updated_at")
    )