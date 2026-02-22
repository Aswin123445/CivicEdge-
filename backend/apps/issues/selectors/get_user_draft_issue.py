from django.shortcuts import get_object_or_404
from apps.issues.models.issues import Issue


def get_user_draft_issue(*, issue_id, user):
    """
    Returns a single draft issue owned by the user.
    Raises 404 if not found or not a draft.
    """
    return get_object_or_404(
        Issue,
        id=issue_id,
        reporter=user,
        is_draft=True,
        is_active=True
    )
