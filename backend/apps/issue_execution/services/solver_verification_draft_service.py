from rest_framework.exceptions import ValidationError
from apps.issue_execution.models import FieldVerificationDraft
from apps.issue_execution.models import SolverTask
from apps.issue_execution.utils.enums.solver_task_status import SolverTaskStatus

def get_or_create_verification_draft(*, solver_task: SolverTask, solver):
    """
    Returns existing verification draft or creates one if missing.
    """

    # Duty check
    if not solver.is_active:
        raise ValidationError("Inactive solver cannot perform this action.")

    # Ownership check
    if solver_task.solver != solver:
        raise ValidationError("You do not own this task.")

    # Phase check
    if solver_task.status != SolverTaskStatus.ASSIGNED:
        raise ValidationError("Verification phase is not active for this task.")

    # Safety: no draft after submission
    if solver_task.verification_reports.filter(is_active=True).exists():
        raise ValidationError("Verification already submitted for this task.")

    draft, _ = FieldVerificationDraft.objects.get_or_create(
        solver_task=solver_task,
        defaults={
            "created_by": solver,
        },
    )

    if draft.is_submitted:
        raise ValidationError("Verification draft is already submitted.")

    return draft