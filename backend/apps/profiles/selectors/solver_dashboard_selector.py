from django.db.models import Count, Q, OuterRef, Subquery

from apps.issue_execution.models.solver_task import SolverTask
from apps.issue_execution.models.task_progress_update import TaskProgressUpdate


def get_solver_dashboard_data(solver):

    tasks = SolverTask.objects.filter(
        solver=solver,
        is_active=True
    )

    # -------------------------
    # Metrics
    # -------------------------

    metrics = tasks.aggregate(
        new_tasks=Count("id", filter=Q(status="ASSIGNED")),
        in_progress=Count("id", filter=Q(status="IN_EXECUTION")),
        waiting_admin_approval=Count("id", filter=Q(status="VERIFICATION_SUBMITTED")),
        resolved=Count("id", filter=Q(status="COMPLETED")),
    )

    # -------------------------
    # Recent assigned tasks
    # -------------------------

    recent_assigned = (
        tasks.filter(status="ASSIGNED")
        .select_related("issue")
        .order_by("-assigned_at")[:3]
    )

    # -------------------------
    # Latest progress subquery
    # -------------------------

    latest_progress = TaskProgressUpdate.objects.filter(
        solver_task=OuterRef("pk")
    ).order_by("-created_at")

    # -------------------------
    # In progress tasks
    # -------------------------

    in_progress_tasks = (
        tasks.filter(status="IN_EXECUTION")
        .annotate(
            latest_progress_summary=Subquery(
                latest_progress.values("progress_summary")[:1]
            ),
            latest_progress_percentage=Subquery(
                latest_progress.values("progress_percentage")[:1]
            ),
        )
        .select_related("issue")
        .order_by("-updated_at")[:3]
    )

    # -------------------------
    # Recently resolved
    # -------------------------

    recent_resolved = (
        tasks.filter(status="COMPLETED")
        .select_related("issue")
        .order_by("-completed_at")[:5]
    )

    return {
        "metrics": metrics,
        "recent_assigned_tasks": recent_assigned,
        "in_progress_tasks": in_progress_tasks,
        "recent_resolved_tasks": recent_resolved,
    }