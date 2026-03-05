from rest_framework.exceptions import ValidationError
from django.db import transaction

from apps.issue_execution.models.solver_task import SolverTask
from apps.issue_execution.models.contractor import Contractor
from apps.issue_execution.models.solver_task import SolverTaskStatus
from apps.issues.models.issue_log import IssueLog
from apps.issues.services.timeline_service import add_issue_timeline_event


@transaction.atomic
def assign_contractor_to_task(*, admin, task: SolverTask, contractor_id):

    # -----------------------------
    # Validate task state
    # -----------------------------
    if task.status != SolverTaskStatus.APPROVED_FOR_EXECUTION:
        raise ValidationError(
            "Contractor can only be assigned after execution approval."
        )

    if task.contractor_id is not None:
        raise ValidationError("Contractor already assigned.")

    # -----------------------------
    # Validate contractor
    # -----------------------------
    try:
        contractor = Contractor.objects.get(
            id=contractor_id,
            is_active=True,
        )
    except Contractor.DoesNotExist:
        raise ValidationError("Invalid contractor.")

    # -----------------------------
    # Assign contractor
    # -----------------------------
    task.contractor = contractor
    task.save(update_fields=["contractor", "updated_at"])
    add_issue_timeline_event(
        issue=task.issue,
        message="assigned contractor for execution",
        created_by=admin,
    )

    # -----------------------------
    # Log timeline event
    # -----------------------------

    return task