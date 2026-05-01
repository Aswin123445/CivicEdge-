from django.db import transaction
from rest_framework.exceptions import ValidationError

from apps.issue_execution.models.execution_proof import ExecutionProof
from apps.issue_execution.models.execution_evidence import ExecutionEvidence
from apps.issue_execution.models.solver_task import SolverTaskStatus
from apps.notification.services.dispatcher import NotificationDispatcher
from apps.notification.utils.event_constants import NotificationEvent
from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity


@transaction.atomic
def submit_completion(*, solver, task, data):

    # -----------------------------
    # Validate solver
    # -----------------------------
    if not solver.is_active:
        raise ValidationError("Your account is inactive.")

    if task.solver != solver:
        raise ValidationError("You are not assigned to this task.")

    if task.status != SolverTaskStatus.IN_EXECUTION:
        raise ValidationError("Task is not currently under execution.")

    # -----------------------------
    # Deactivate old proof (if any)
    # -----------------------------
    ExecutionProof.objects.filter(
        solver_task=task,
        is_active=True,
    ).update(is_active=False)

    # -----------------------------
    # Create new proof
    # -----------------------------
    proof = ExecutionProof.objects.create(
        solver_task=task,
        submitted_by=solver,
        completion_summary=data["completion_summary"],
        deviations_from_plan=data.get("deviations_from_plan", ""),
        remaining_issues=data.get("remaining_issues", ""),
    )

    # -----------------------------
    # Create evidence records
    # -----------------------------
    for evidence in data["evidences"]:
        ExecutionEvidence.objects.create(
            execution_proof=proof,
            uploaded_by=solver,
            public_id=evidence["public_id"],
            secure_url=evidence["secure_url"],
            resource_type=evidence.get("resource_type", "image"),
            format=evidence.get("format", ""),
            width=evidence.get("width"),
            height=evidence.get("height"),
            bytes=evidence.get("bytes"),
        )
    # -----------------------------
    # Transition task state
    # -----------------------------
    task.submit_completion(by=solver)
    create_activity(
        user=solver,
        entity=ActivityEntity.TASK,
        action=ActivityAction.COMPLETED,
        message=f"You have completed the task for issue: {task.issue.title}",
    )
    def after_commit():
        NotificationDispatcher.dispatch(
            event=NotificationEvent.TASK_COMPLETED_BY_SOLVER,
            payload={
                "task": task,
                "actor": solver
            }
        )
    transaction.on_commit(after_commit)

    return proof
