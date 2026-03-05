from django.db.models import OuterRef, Subquery
from apps.issues.models.issues import Issue
from apps.issues.models.issue_administrative_decision import IssueAdministrativeDecision
from apps.issues.utils.enums.issue_status import IssueStatus


def get_issues_pending_solver_assignment():
    latest_decision = IssueAdministrativeDecision.objects.filter(
        issue=OuterRef("pk"),
        is_active=True,
    ).values("decision_type")[:1]

    return (
        Issue.objects
        .filter(status=IssueStatus.IN_REVIEW)
        .annotate(latest_decision=Subquery(latest_decision))
        .filter(latest_decision=IssueAdministrativeDecision.DecisionType.APPROVED)
        .filter(solver_tasks__isnull=True)
        .select_related("reporter", "category")
        .order_by("-created_at")
    )