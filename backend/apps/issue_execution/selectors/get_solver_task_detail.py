from django.shortcuts import get_object_or_404
from apps.issue_execution.models.solver_task import SolverTask


def get_solver_task_detail(*, task_id, solver):
    """
    Fetch a single solver task with full context.
    Ownership is enforced here.
    """
    return get_object_or_404(
        SolverTask.objects
        .select_related(
            "issue",
            "issue__category",
            "issue__location",
        ),
        id=task_id,
        solver=solver,
        is_active=True,
    )