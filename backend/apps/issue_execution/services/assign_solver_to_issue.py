from django.db import transaction
from rest_framework.exceptions import ValidationError

from apps.issues.utils.enums.issue_status import IssueStatus
from apps.issue_execution.models.solver_task import SolverTask
from apps.issues.models.issue_administrative_decision import IssueAdministrativeDecision
from apps.issues.services.timeline_service import add_issue_timeline_event
from apps.notification.services.dispatcher import NotificationDispatcher
from apps.notification.utils.event_constants import NotificationEvent
from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity


@transaction.atomic
def assign_solver_to_issue(*, issue, solver, assigned_by, remarks=None):

    if issue.status != IssueStatus.IN_REVIEW:
        raise ValidationError("Solver can only be assigned during review.")

    if issue.solver_tasks.exists():
        raise ValidationError("Solver already assigned to this issue.")

    active_decision = issue.administrative_decisions.filter(is_active=True).first()
    if not active_decision or active_decision.decision_type != IssueAdministrativeDecision.DecisionType.APPROVED:
        raise ValidationError("Issue must be approved before assigning solver.")

    task = SolverTask.objects.create(
        issue=issue,
        solver=solver,
        assigned_by=assigned_by,
    )
    add_issue_timeline_event(
        issue=issue,
        message="Collecting evidences from location",
        created_by=assigned_by,
    )
    create_activity(
        user=assigned_by,
        entity=ActivityEntity.TASK,
        action=ActivityAction.ASSIGNED,
        message=f"Assigned {solver.email} to issue: {issue.title}",
    )
    
    def after_commit():
        NotificationDispatcher.dispatch(
            event=NotificationEvent.TASK_ASSIGNED_TO_SOLVER,
            payload={
                "task": task,
                "actor": assigned_by
            }
        )

    transaction.on_commit(after_commit)

    return task
