from apps.issue_execution.models.field_verification_report import FieldVerificationReport
from apps.issues.models.issue_administrative_decision import IssueAdministrativeDecision


def get_pending_verification_reports():
    """
    Reports submitted by solvers that have not yet received
    an administrative decision.
    """ 
    

    return (
        FieldVerificationReport.objects
        .filter(
            is_active=True,
            solver_task__issue__status="IN_REVIEW",
        )
        .exclude(
            solver_task__issue__administrative_decisions__is_active=True,
            solver_task__issue__administrative_decisions__context="VERIFICATION_REVIEW",
        )
        .select_related(
            "solver_task",
            "solver_task__issue",
            "submitted_by",
        )
        .order_by("-submitted_at")
    )