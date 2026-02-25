from apps.issues.selectors.issue_summary import get_issue_home_counts

def get_issue_home_summary(*, user):
    counts = get_issue_home_counts(user=user)

    return {
        "draft_issues": counts["draft_count"],
        "submitted_issues": counts["submitted_count"],
        "awaiting_review": counts["awaiting_review_count"],
    }