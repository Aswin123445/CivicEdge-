from apps.issue_execution.models.execution_proof import ExecutionProof
from apps.issue_execution.utils.enums.solver_task_status import SolverTaskStatus


def get_pending_execution_proofs():
    return (
        ExecutionProof.objects
        .select_related("solver_task__issue", "submitted_by")
        .filter(
            is_active=True,
            solver_task__status=SolverTaskStatus.COMPLETION_SUBMITTED,
        )
        .order_by("-submitted_at")
    )