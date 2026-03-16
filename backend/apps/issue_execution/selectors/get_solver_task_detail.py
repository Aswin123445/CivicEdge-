from django.shortcuts import get_object_or_404
from apps.issue_execution.models.solver_task import SolverTask


def get_solver_task_detail(*, task_id, solver):
    """
    Fetch a single solver task with full context.
    Ownership is enforced here.
    """
    if solver.is_superuser:
        return get_object_or_404(
            SolverTask.objects
            .select_related(
                "issue",
                "issue__category",
                "issue__location",
            )
            .prefetch_related("verification_reports","execution_proofs"),
            id=task_id,
            is_active=True,
        )
    return get_object_or_404(
        SolverTask.objects
        .select_related(
            "issue",
            "issue__category",
            "issue__location",
        )
        .prefetch_related("verification_reports","execution_proofs"),
        id=task_id,
        solver=solver,
        is_active=True,
    )