from apps.issue_execution.models.solver_task import SolverTask
from apps.issue_execution.models.solver_task import SolverTaskStatus


def get_solver_tasks_by_status(*, status: str):
    queryset = SolverTask.objects.filter(is_active=True)
    if status := status:
        queryset = queryset.filter(status=status)
    return (
        queryset
        .select_related(
            "issue",
            "solver",
            "contractor",
        )
        .prefetch_related("progress_updates")
        .order_by("-updated_at")
    )