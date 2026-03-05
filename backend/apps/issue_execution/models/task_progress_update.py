import uuid
from django.db import models
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError  
from apps.issue_execution.models.solver_task import SolverTaskStatus
from apps.issue_execution.models.solver_task import SolverTask
from shared.utils.generate_reference_id import generate_reference_id

User = get_user_model()
class TaskProgressUpdate(models.Model):
    """
    Append-only progress updates posted by solver during execution.
    Used for transparency and monitoring, not authority.
    """

    # -----------------------------
    # Identity
    # -----------------------------
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    reference_id = models.CharField(
        max_length=20,
        unique=True,
        db_index=True,
        editable=False,
    )

    # -----------------------------
    # Core linkage
    # -----------------------------
    solver_task = models.ForeignKey(
        SolverTask,
        on_delete=models.CASCADE,
        related_name="progress_updates",
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="task_progress_updates",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    # -----------------------------
    # Progress content
    # -----------------------------
    progress_summary = models.TextField(
        help_text="Description of work done or current status",
    )

    progress_percentage = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
        help_text="Optional rough progress indicator (0–100)",
    )

    blockers = models.TextField(
        blank=True,
        help_text="Any blockers or delays encountered",
    )

    next_steps = models.TextField(
        blank=True,
        help_text="Planned next steps, if any",
    )

    # -----------------------------
    # Meta
    # -----------------------------
    is_active = models.BooleanField(default=True)

    # -----------------------------
    # Integrity rules
    # -----------------------------
    def clean(self):
        # Only assigned solver can post updates
        if self.created_by != self.solver_task.solver:
            raise ValidationError(
                "Only the assigned solver can post task progress updates."
            )

        # Progress updates only allowed during execution
        if self.solver_task.status not in {
            SolverTaskStatus.IN_EXECUTION
        }:
            raise ValidationError(
                "Progress updates can only be added during execution."
            )

        # Validate percentage if provided
        if self.progress_percentage is not None:
            if not 0 <= self.progress_percentage <= 100:
                raise ValidationError(
                    "Progress percentage must be between 0 and 100."
                )

    def save(self, *args, **kwargs):
        if not self._state.adding:
            raise RuntimeError("Progress updates are immutable.")
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=TaskProgressUpdate,
                field_name="reference_id",
                prefix="TPU",
                padding=10,
            )

        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Progress Update {self.reference_id}"