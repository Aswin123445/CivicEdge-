from apps.issues.models.issues import Issue
from apps.issues.models.issue_administrative_decision import IssueAdministrativeDecision

def get_issue_by_id(issue_id):
    return Issue.objects.select_related(
        "category"
    ).prefetch_related(
        "evidences",
        "timeline_events",
    ).get(id=issue_id,is_draft=False,is_active=True)


def get_latest_admin_decision(issue):
    return (
        IssueAdministrativeDecision.objects
        .filter(issue=issue, is_active=True)
        .order_by("-created_at")
        .first()
    )