import uuid
from django.db import models
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model

from apps.issue_execution.models.solver_task import SolverTask
from shared.utils.generate_reference_id import generate_reference_id

User = get_user_model()

class FieldVerificationReport(models.Model):
    """
    Immutable, solver-authored field verification report.
    Used by admins to decide whether execution should proceed.
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
        related_name="verification_reports",
    )

    submitted_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="submitted_verification_reports",
    )

    submitted_at = models.DateTimeField(auto_now_add=True)

    # -----------------------------
    # Ground reality verification
    # -----------------------------
    is_issue_present = models.BooleanField()
    severity_level = models.CharField(
        max_length=20,
        choices=[
            ("LOW", "Low"),
            ("MEDIUM", "Medium"),
            ("HIGH", "High"),
            ("CRITICAL", "Critical"),
        ],
    )
    affected_area_description = models.TextField()

    # -----------------------------
    # Impact & community assessment
    # -----------------------------
    public_impact_summary = models.TextField()
    estimated_people_affected = models.PositiveIntegerField(null=True, blank=True)
    local_feedback_summary = models.TextField(blank=True)

    # -----------------------------
    # Execution estimation (NOT approvals)
    # -----------------------------
    estimated_budget = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )
    estimated_duration_days = models.PositiveIntegerField()
    work_nature = models.CharField(max_length=100,blank=True,null=True)

    # -----------------------------
    # Constraints & risks
    # -----------------------------
    site_constraints = models.TextField(blank=True)
    execution_risks = models.TextField(blank=True)

    # -----------------------------
    # Versioning / lifecycle
    # -----------------------------
    is_active = models.BooleanField(
        default=True,
        help_text="Only one active report per solver task",
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
        if self.submitted_by_id != self.solver_task.solver_id:
            raise ValidationError(
                "Only the assigned solver can submit a verification report."
            )

        # Enforce one active report per SolverTask
        if self.is_active:
            qs = FieldVerificationReport.objects.filter(
                solver_task=self.solver_task,
                is_active=True,
            )
            if self.pk:
                qs = qs.exclude(pk=self.pk)

            if qs.exists():
                raise ValidationError(
                    "Only one active verification report is allowed per solver task."
                )

    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=FieldVerificationReport,
                field_name="reference_id",
                prefix="FVR",
                padding=10,
            )

        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Verification Report {self.reference_id}"