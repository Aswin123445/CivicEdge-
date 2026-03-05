import uuid
from django.db import models
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model

from apps.issue_execution.models.solver_task import SolverTask
from shared.utils.generate_reference_id import generate_reference_id

User = get_user_model()


class ExecutionProof(models.Model):
    """
    Immutable, solver-authored proof that execution work has been completed.
    Reviewed by admin before closing the issue.
    """
    
    class ReviewStatus(models.TextChoices):
        PENDING = "pending", "Pending"
        APPROVED = "approved", "Approved"
        REJECTED = "rejected", "Rejected"

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
    review_status = models.CharField(
        max_length=20,
        choices=ReviewStatus.choices,
        default=ReviewStatus.PENDING,
        db_index=True,
    )
    admin_message = models.TextField(
        blank=True,
        help_text="Reason provided by admin if proof is rejected",
        default="Please wait for admin review",
    )
    reviewed_by = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.PROTECT,
        related_name="reviewed_execution_proofs"
    )

    # -----------------------------
    # Core linkage
    # -----------------------------
    solver_task = models.ForeignKey(
        SolverTask,
        on_delete=models.CASCADE,
        related_name="execution_proofs",
    )

    submitted_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="submitted_execution_proofs",
    )

    submitted_at = models.DateTimeField(auto_now_add=True)

    # -----------------------------
    # Completion context
    # -----------------------------
    completion_summary = models.TextField(
        help_text="Summary of work completed on the ground",
    )

    deviations_from_plan = models.TextField(
        blank=True,
        help_text="Any deviation from approved plan, if applicable",
    )

    remaining_issues = models.TextField(
        blank=True,
        help_text="Any remaining minor issues or follow-up notes",
    )

    # -----------------------------
    # Versioning / lifecycle
    # -----------------------------
    is_active = models.BooleanField(
        default=True,
        help_text="Only one active execution proof per solver task",
    )

    # -----------------------------
    # Meta
    # -----------------------------
    created_at = models.DateTimeField(auto_now_add=True)

    # -----------------------------
    # Integrity & immutability
    # -----------------------------
    def clean(self):
        # Enforce solver ownership
        if self.submitted_by != self.solver_task.solver:
            raise ValidationError(
                "Only the assigned solver can submit execution proof."
            )

        # Enforce one active proof per task
        if self.is_active:
            qs = ExecutionProof.objects.filter(
                solver_task=self.solver_task,
                is_active=True,
            )
            if self.pk:
                qs = qs.exclude(pk=self.pk)

            if qs.exists():
                raise ValidationError(
                    "Only one active execution proof is allowed per solver task."
                )

    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=ExecutionProof,
                field_name="reference_id",
                prefix="EXP",
                padding=10,
            )

        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Execution Proof {self.reference_id} ({self.pk})"