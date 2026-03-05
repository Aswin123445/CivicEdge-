from apps.issue_execution.models.task_progress_update import TaskProgressUpdate


def get_task_progress_updates(*, task):
    return (
        TaskProgressUpdate.objects
        .filter(
            solver_task=task,
            is_active=True,
        )
        .order_by("created_at")
    )