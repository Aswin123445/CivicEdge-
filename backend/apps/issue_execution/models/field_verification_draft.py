import uuid
from django.db import models
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model

from apps.issue_execution.models.solver_task import SolverTask

User = get_user_model()
class FieldVerificationDraft(models.Model):
    """
    Temporary, mutable working model for solver field verification.
    Used to collect data section-by-section before final submission.
    """

    # -----------------------------
    # Identity & linkage
    # -----------------------------
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    solver_task = models.OneToOneField(
        SolverTask,
        on_delete=models.CASCADE,
        related_name="verification_draft",
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="field_verification_drafts",
    )
    is_submitted = models.BooleanField(default=False)
    # -----------------------------
    # Section completion flags
    # -----------------------------
    ground_verification_completed = models.BooleanField(default=False)
    impact_assessment_completed = models.BooleanField(default=False)
    estimation_completed = models.BooleanField(default=False)
    evidence_completed = models.BooleanField(default=False)

    # -----------------------------
    # Ground verification section
    # -----------------------------
    is_issue_present = models.BooleanField(null=True)
    severity_level = models.CharField(
        max_length=20,
        choices=[
            ("LOW", "Low"),
            ("MEDIUM", "Medium"),
            ("HIGH", "High"),
            ("CRITICAL", "Critical"),
        ],
        null=True,
        blank=True,
    )
    affected_area_description = models.TextField(blank=True)

    # -----------------------------
    # Impact & community section
    # -----------------------------
    public_impact_summary = models.TextField(blank=True)
    estimated_people_affected = models.PositiveIntegerField(null=True, blank=True)
    local_feedback_summary = models.TextField(blank=True)

    # -----------------------------
    # Estimation & risk section
    # -----------------------------
    estimated_budget = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
    )
    estimated_duration_days = models.PositiveIntegerField(null=True, blank=True)
    site_constraints = models.TextField(blank=True)
    execution_risks = models.TextField(blank=True)

    # -----------------------------
    # Meta
    # -----------------------------
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # -----------------------------
    # Validation & integrity
    # -----------------------------
    def clean(self):
        # Ensure only assigned solver can own the draft
        if self.created_by_id != self.solver_task.solver_id:
            raise ValidationError(
                "Only the assigned solver can create or modify this draft."
            )

    # -----------------------------
    # Section validators (DOMAIN LOGIC)
    # -----------------------------
    def validate_ground_verification(self):
        if self.is_issue_present is None:
            raise ValidationError("Issue presence must be specified.")
        if not self.severity_level:
            raise ValidationError("Severity level is required.")
        if not self.affected_area_description.strip():
            raise ValidationError("Affected area description is required.")

        self.ground_verification_completed = True

    def validate_impact_assessment(self):
        if not self.public_impact_summary.strip():
            raise ValidationError("Public impact summary is required.")

        self.impact_assessment_completed = True

    def validate_estimation(self):
        if self.estimated_budget is None:
            raise ValidationError("Estimated budget is required.")
        if self.estimated_duration_days is None:
            raise ValidationError("Estimated duration is required.")


        self.estimation_completed = True

    def validate_evidence(self):
        """
        Media existence is checked via related media table.
        """
        if not hasattr(self, "media") or self.media.count() == 0:
            raise ValidationError("At least one verification image is required.")

        self.evidence_completed = True

    # -----------------------------
    # Submission readiness
    # -----------------------------
    def is_ready_for_submission(self):
        return all([
            self.ground_verification_completed,
            self.impact_assessment_completed,
            self.estimation_completed,
            self.evidence_completed,
        ])

    def __str__(self):
        return f"Verification Draft for Task {self.solver_task.reference_id}"