from django.db import transaction
from rest_framework.exceptions import ValidationError

from apps.issue_execution.models.solver_task import SolverTask


@transaction.atomic
def start_execution(*, solver, task: SolverTask):

    if not solver.is_active:
        raise ValidationError("Your account is inactive.")

    if task.solver != solver:
        raise ValidationError("You are not assigned to this task.")

    task.start_execution(by=solver)

    return task