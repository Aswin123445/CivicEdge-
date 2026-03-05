from apps.issue_execution.models.solver_task import SolverTask


def get_solver_tasks(*, solver):
    """
    Returns tasks assigned to the solver.
    """
    return (
        SolverTask.objects
        .filter(solver=solver, is_active=True)
        .select_related(
            "issue",
            "issue__category",
        )
        .order_by("-created_at")
    )