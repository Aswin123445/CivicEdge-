from rest_framework.exceptions import ValidationError
from django.db import transaction

from apps.issues.models.issue_administrative_decision import IssueAdministrativeDecision
from apps.issues.services.timeline_service import add_issue_timeline_event
from django.utils import timezone

from apps.notification.services.dispatcher import NotificationDispatcher
from apps.notification.utils.event_constants import NotificationEvent


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
    context = IssueAdministrativeDecision.DecisionContext.VERIFICATION_REVIEW
    if data["decision_type"] == IssueAdministrativeDecision.DecisionType.POSTPONED:
        context = IssueAdministrativeDecision.DecisionContext.REEVALUATION_REVIEW
    decision = IssueAdministrativeDecision.objects.create(
        issue=issue,
        context=context,
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

    events_to_dispatch = []
    if decision.decision_type == IssueAdministrativeDecision.DecisionType.APPROVED:
        issue.start_progress(by=admin)
        report.solver_task.approve_execution(by=admin)

    elif decision.decision_type == IssueAdministrativeDecision.DecisionType.BLOCKED:
        issue.reject(by=admin, reason=data["reason"])
        report.solver_task.completed_at = timezone.now()    
        report.solver_task.save(update_fields=["completed_at"])
        report.solver_task.approve_completion(by=admin)

        events_to_dispatch.append(
            (NotificationEvent.ISSUE_REJECTED, {"issue": issue, "actor": admin})
        )

    elif decision.decision_type in [
        IssueAdministrativeDecision.DecisionType.POSTPONED,
    ]:
        issue.move_postpone(by=admin)
        report.solver_task.postpone_task(by=admin)
    if decision.decision_type != IssueAdministrativeDecision.DecisionType.POSTPONED:
        events_to_dispatch.append(
            (
                NotificationEvent.APPROVE_REPORT,
                {"task": report.solver_task, "actor": admin},
            )
        )
    if decision.decision_type == IssueAdministrativeDecision.DecisionType.BLOCKED:
        events_to_dispatch.append(
            (
                NotificationEvent.TASK_APPROVED_BY_ADMIN,
                {"task": report.solver_task, "actor": admin},
            )
        )
    def after_commit():
        for event, payload in events_to_dispatch:
            NotificationDispatcher.dispatch(event=event, payload=payload)

    transaction.on_commit(after_commit)

    return decision
