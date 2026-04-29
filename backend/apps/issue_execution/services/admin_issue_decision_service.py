from django.db import transaction
from rest_framework.exceptions import ValidationError

from apps.issues.models.issues import Issue
from apps.issues.models.issue_administrative_decision import IssueAdministrativeDecision
from apps.issues.utils.enums.issue_status import IssueStatus
from apps.issues.services.timeline_service import add_issue_timeline_event
from apps.issue_execution.utils.celery.send_issue_rejected_email import send_issue_rejected_email


@transaction.atomic
def create_admin_issue_decision(*, issue: Issue, decided_by, data: dict):
    """
    Creates an administrative decision during initial issue review.
    """

    # --- Guards ---
    if issue.status != IssueStatus.IN_REVIEW:
        raise ValidationError("Administrative decision can only be made during review.")

    # --- Deactivate previous active decision ---
    IssueAdministrativeDecision.objects.filter(
        issue=issue,
        is_active=True,
    ).update(is_active=False)

    # --- Create new decision ---
    decision = IssueAdministrativeDecision.objects.create(
        issue=issue,
        decision_type=data["decision_type"],
        reason=data["reason"],
        public_message=data.get("public_message", ""),
        expected_review_date=data.get("expected_review_date"),
        decided_by=decided_by,
        is_active=True,
    )

    # --- Decision effects ---
    if decision.decision_type == IssueAdministrativeDecision.DecisionType.BLOCKED:
        issue.reject(by=decided_by, reason=decision.reason)
        send_issue_rejected_email.delay(
            to_email=issue.reporter.email,
            issue_title=issue.title,
            issue_description=issue.description,
            rejection_message=decision.public_message,
        )

    elif decision.decision_type == IssueAdministrativeDecision.DecisionType.APPROVED:

        # stays IN_REVIEW, next step is solver assignment
        pass

    elif decision.decision_type == IssueAdministrativeDecision.DecisionType.POSTPONED:
        # stays IN_REVIEW, admin will revisit later
        pass

    elif decision.decision_type == IssueAdministrativeDecision.DecisionType.ESCALATED:
        # stays IN_REVIEW, higher authority involved
        pass
    add_issue_timeline_event(
        issue=issue,
        message=data.get("public_message", ""),
        created_by=decided_by,
    )

    return decision
