from apps.issues.models.issues import Issue


def get_user_draft_issues(*, user):
    """
    Returns all draft issues for a given user.
    Drafts are private and resumable.
    """
    return (
        Issue.objects
        .filter(reporter=user, is_draft=True,is_active=True)
        .order_by("-updated_at")
    )
