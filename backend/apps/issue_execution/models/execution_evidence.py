import uuid
from django.db import models
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model

from apps.issue_execution.models.execution_proof import ExecutionProof
from shared.utils.generate_reference_id import generate_reference_id

User = get_user_model()


class ExecutionEvidence(models.Model):
    """
    Immutable evidence uploaded for execution completion proof.
    Belongs strictly to a specific ExecutionProof version.
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
    execution_proof = models.ForeignKey(
        ExecutionProof,
        on_delete=models.CASCADE,
        related_name="evidences",
    )

    # -----------------------------
    # Cloudinary metadata
    # -----------------------------
    public_id = models.CharField(max_length=255)
    secure_url = models.URLField()

    resource_type = models.CharField(
        max_length=20,
        choices=[
            ("image", "Image"),
            ("video", "Video"),
        ],
        default="image",
    )

    format = models.CharField(max_length=20, blank=True)

    width = models.PositiveIntegerField(null=True, blank=True)
    height = models.PositiveIntegerField(null=True, blank=True)
    bytes = models.PositiveIntegerField(null=True, blank=True)

    # -----------------------------
    # Meta
    # -----------------------------
    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="uploaded_execution_evidence",
    )

    uploaded_at = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)

    # -----------------------------
    # Integrity & immutability
    # -----------------------------
    def clean(self):
        # 1️⃣ Ensure proof is active
        if not self.execution_proof.is_active:
            raise ValidationError(
                "Cannot attach evidence to inactive execution proof."
            )

        # 2️⃣ Only assigned solver can upload
        if self.uploaded_by_id != self.execution_proof.solver_task.solver_id:
            raise ValidationError(
                "Only assigned solver can upload execution evidence."
            )

        # 3️⃣ Prevent evidence after proof lifecycle ends
        if self.execution_proof.solver_task.status not in {
            "IN_EXECUTION",
            "COMPLETION_SUBMITTED",
        }:
            raise ValidationError(
                "Execution evidence can only be added during completion submission."
            )

    def save(self, *args, **kwargs):
        # Prevent updates (immutable)
        if not self._state.adding:
            raise RuntimeError("ExecutionEvidence records are immutable.")

        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=ExecutionEvidence,
                field_name="reference_id",
                prefix="EXE",
                padding=10,
            )

        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Execution Evidence {self.reference_id}"