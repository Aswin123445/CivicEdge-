from django.db import transaction
from rest_framework.exceptions import ValidationError

from apps.issue_execution.models.task_progress_update import TaskProgressUpdate
from apps.issue_execution.models.solver_task import SolverTaskStatus


@transaction.atomic
def create_progress_update(*, solver, task, data):

    if not solver.is_active:
        raise ValidationError("Your account is inactive.")

    if task.solver_id != solver.id:
        raise ValidationError("You are not assigned to this task.")

    if task.status != SolverTaskStatus.IN_EXECUTION:
        raise ValidationError(
            "Progress updates are allowed only during execution."
        )

    progress = TaskProgressUpdate.objects.create(
        solver_task=task,
        created_by=solver,
        progress_summary=data.get("progress_summary"),
        progress_percentage=data.get("progress_percentage"),
        blockers=data.get("blockers", ""),
        next_steps=data.get("next_steps", ""),
    )

    return progress