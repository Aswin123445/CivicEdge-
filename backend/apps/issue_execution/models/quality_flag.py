import uuid
from django.db import models
from django.contrib.auth import get_user_model
from shared.utils.generate_reference_id import generate_reference_id

from apps.issue_execution.models.solver_task import SolverTask
from apps.issues.models.issues import Issue

User = get_user_model()


class QualityFlag(models.Model):
    """
    System-generated quality or risk signal.
    Does not affect workflow; used for monitoring and escalation.
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
    # Scope
    # -----------------------------
    issue = models.ForeignKey(
        Issue,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="quality_flags",
    )

    solver_task = models.ForeignKey(
        SolverTask,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="quality_flags",
    )

    # -----------------------------
    # Flag classification
    # -----------------------------
    flag_type = models.CharField(
        max_length=50,
        choices=[
            ("MULTIPLE_REJECTIONS", "Multiple Rejections"),
            ("LONG_EXECUTION", "Long Execution Duration"),
            ("FREQUENT_REOPEN", "Frequent Reopen"),
            ("LOW_EVIDENCE_QUALITY", "Low Evidence Quality"),
            ("UNUSUAL_ACTIVITY", "Unusual Activity"),
            ("MANUAL_REVIEW", "Manual Review Required"),
        ],
    )

    severity = models.CharField(
        max_length=20,
        choices=[
            ("LOW", "Low"),
            ("MEDIUM", "Medium"),
            ("HIGH", "High"),
            ("CRITICAL", "Critical"),
        ],
        default="LOW",
    )

    # -----------------------------
    # Description
    # -----------------------------
    message = models.TextField(
        help_text="Human-readable explanation of why this flag was raised",
    )

    # -----------------------------
    # Acknowledgement (optional)
    # -----------------------------
    acknowledged = models.BooleanField(default=False)

    acknowledged_by = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.PROTECT,
        related_name="acknowledged_quality_flags",
    )

    acknowledged_at = models.DateTimeField(null=True, blank=True)

    # -----------------------------
    # Meta
    # -----------------------------
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    # -----------------------------
    # Integrity
    # -----------------------------
    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=QualityFlag,
                field_name="reference_id",
                prefix="QF",
                padding=10,
            )
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.flag_type} ({self.severity})"