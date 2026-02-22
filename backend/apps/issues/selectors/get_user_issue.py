from django.shortcuts import get_object_or_404
from apps.issues.models.issues import Issue


def get_user_issue(*, issue_id, user):
    """
    Fetch a non-draft issue owned by the user.
    Used for citizen actions on submitted issues.
    """
    return get_object_or_404(
        Issue,
        id=issue_id,
        reporter=user,
        is_draft=False,
        is_active=True,
    )
