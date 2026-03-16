from rest_framework.exceptions import ValidationError
from django.db import transaction

from apps.issues.models.issue_administrative_decision import IssueAdministrativeDecision
from apps.issues.services.timeline_service import add_issue_timeline_event


@transaction.atomic
def create_verification_decision(*, admin, report, data):
    issue = report.solver_task.issue

    # -----------------------------
    # Prevent duplicate decision
    # -----------------------------
    if IssueAdministrativeDecision.objects.filter(
        issue=issue,
        context=IssueAdministrativeDecision.DecisionContext.VERIFICATION_REVIEW,
        is_active=True,
    ).exists():
        raise ValidationError("Verification decision already exists.")

    # -----------------------------
    # Create decision
    # -----------------------------
    decision = IssueAdministrativeDecision.objects.create(
        issue=issue,
        context=IssueAdministrativeDecision.DecisionContext.VERIFICATION_REVIEW,
        decision_type=data["decision_type"],
        reason=data["reason"],
        public_message=data.get("public_message", ""),
        expected_review_date=data.get("expected_review_date"),
        decided_by=admin,
    )
    add_issue_timeline_event(
        issue=issue,
        message=data.get("public_message", ""),
        created_by=admin,
    )

    # -----------------------------
    # Apply state transition
    # -----------------------------
    if decision.decision_type == IssueAdministrativeDecision.DecisionType.APPROVED:
        issue.start_progress(by=admin)
        report.solver_task.approve_execution(by=admin)

    elif decision.decision_type == IssueAdministrativeDecision.DecisionType.BLOCKED:
        issue.reject(by=admin, reason=data["reason"])
        report.solver_task.approve_completion(by=admin)

    elif decision.decision_type in [
        IssueAdministrativeDecision.DecisionType.POSTPONED,
        IssueAdministrativeDecision.DecisionType.ESCALATED,
    ]:
        # remains IN_REVIEW
        pass

    return decision