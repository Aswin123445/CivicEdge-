from django.shortcuts import get_object_or_404
from django.db.models import Prefetch

from apps.issues.models.issues import Issue
from apps.issues.models.issue_administrative_decision import IssueAdministrativeDecision
from apps.issue_execution.models.solver_task import SolverTask
from apps.issues.models.issue_evidence import IssueEvidence


def get_admin_issue_detail(issue_id):
    """
    Fetch full issue context for admin decision-making.
    """
    return get_object_or_404(
        Issue.objects
        .select_related(
            "reporter",
            "category",
            
        )
        .prefetch_related(
            Prefetch(
                "administrative_decisions",
                queryset=IssueAdministrativeDecision.objects.filter(is_active=True).order_by("-created_at"),
            ),
            Prefetch(
                "solver_tasks",
                queryset=SolverTask.objects.select_related("solver", "contractor"),
            ),
            Prefetch(
                "evidences",
                queryset=IssueEvidence.objects.all(),
            ),
        ),
        id=issue_id,
    )