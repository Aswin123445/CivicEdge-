import uuid
from django.db import models
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.utils import timezone

from apps.issues.models.issues import Issue
from apps.issue_execution.utils.enums.solver_task_status import ALLOWED_SOLVER_TASK_TRANSITIONS, SolverTaskStatus
from shared.utils.generate_reference_id import generate_reference_id
from django.shortcuts import get_object_or_404

User = get_user_model()

class SolverTask(models.Model):
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

    issue = models.ForeignKey(
        Issue,
        on_delete=models.CASCADE,
        related_name="solver_tasks",
    )

    # -----------------------------
    # Assignment
    # -----------------------------
    solver = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="assigned_solver_tasks",
    )

    assigned_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="solver_tasks_assigned",
    )

    assigned_at = models.DateTimeField(auto_now_add=True)

    # -----------------------------
    # Execution lifecycle
    # -----------------------------
    status = models.CharField(
        max_length=30,
        choices=SolverTaskStatus.choices,
        default=SolverTaskStatus.ASSIGNED,
        db_index=True,
    )

    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    # -----------------------------
    # Execution context (admin-approved)
    # -----------------------------
    contractor = models.ForeignKey(
        "Contractor",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="solver_tasks",
    )

    approved_budget = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
    )

    approved_duration_days = models.PositiveIntegerField(
        null=True,
        blank=True,
    )

    # -----------------------------
    # Quality & control signals
    # -----------------------------
    verification_rejection_count = models.PositiveIntegerField(default=0)
    completion_rejection_count = models.PositiveIntegerField(default=0)

    is_active = models.BooleanField(default=True)

    # -----------------------------
    # Meta
    # -----------------------------
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # -----------------------------
    # Validation & Integrity
    # -----------------------------
    def clean(self):
        """
        Enforces execution lifecycle invariants.
        """
        if not SolverTask.objects.filter(pk=self.pk).exists():
            return  # New object

        previous = get_object_or_404(SolverTask, pk=self.pk)

        if self.issue_id != previous.issue_id:
            raise ValidationError("Issue cannot be changed once task is created.")

        if self.assigned_by_id != previous.assigned_by_id:
            raise ValidationError("assigned_by cannot be changed.")

        if self.status != previous.status:
            allowed = ALLOWED_SOLVER_TASK_TRANSITIONS.get(previous.status, set())
            if self.status not in allowed:
                raise ValidationError(
                    f"Invalid SolverTask transition from {previous.status} to {self.status}"
                )

        if self.status == SolverTaskStatus.COMPLETED and not self.completed_at:
            raise ValidationError("completed_at must be set when task is completed.")

    def save(self, *args, **kwargs):
        validate = kwargs.pop("validate", True)

        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=SolverTask,
                field_name="reference_id",
                prefix="TSK",
                padding=10,
            )

        if validate:
            self.full_clean()

        super().save(*args, **kwargs)
    # -----------------------------
    # Solver actions
    # -----------------------------

    def submit_verification(self, *, by):
        if by != self.solver:
            raise ValidationError("Only assigned solver can submit verification.")

        self._transition(to_status=SolverTaskStatus.VERIFICATION_SUBMITTED)
    
    def terminate(self, *, by):
        if by.role != "admin":
            raise ValidationError("Only admin can terminate task.")

        self._transition(to_status=SolverTaskStatus.TERMINATED)



    def start_execution(self, *, by):
        if self.status != SolverTaskStatus.APPROVED_FOR_EXECUTION:
            raise ValidationError("Not allowed to perform this action.")
    
        if not self.contractor:
            raise ValidationError("Contractor must be assigned before execution starts.")
    
        if self.solver_id != by.id:
            raise ValidationError("Only assigned solver can start execution.")
    
        self._transition(
            to_status=SolverTaskStatus.IN_EXECUTION,
        )

    def submit_completion(self, *, by):
        if not (by == self.solver or by.role == "admin"):
            raise ValidationError("Only assigned solver or admin can submit completion.")

        self.completed_at = timezone.now()
        self._transition(to_status=SolverTaskStatus.COMPLETION_SUBMITTED)
    # -----------------------------
    # Admin actions
    # -----------------------------

    def approve_execution(self, *, by):
        if not by.is_staff:
            raise ValidationError("Only admin can approve execution.")
        self._transition(to_status=SolverTaskStatus.APPROVED_FOR_EXECUTION)

    def reject_verification(self, *, by):
        if not by.is_staff:
            raise ValidationError("Only admin can reject verification.")

        self.verification_rejection_count += 1
        self._transition(to_status=SolverTaskStatus.ASSIGNED)

    def approve_completion(self, *, by):
        if not by.is_staff:
            raise ValidationError("Only admin can approve completion.")

        self._transition(to_status=SolverTaskStatus.COMPLETED)

    def reject_completion(self, *, by):
        if not by.is_staff:
            raise ValidationError("Only admin can reject completion.")

        self.completion_rejection_count += 1
        self._transition(to_status=SolverTaskStatus.IN_EXECUTION)
    # -----------------------------
    # Internal transition helper
    # -----------------------------

    def _transition(self, *, to_status):
        self.status = to_status
        self.save()
        
    def __str__(self):
        return f"{self.reference_id} {self.status} ({self.pk})"