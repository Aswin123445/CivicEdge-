import uuid
from django.db import models
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model

from apps.issue_execution.models.field_verification_draft import FieldVerificationDraft
from apps.issue_execution.models.field_verification_report import FieldVerificationReport
from shared.utils.generate_reference_id import generate_reference_id

User = get_user_model()


class VerificationEvidence(models.Model):
    """
    Stores Cloudinary-backed evidence uploaded by solver.
    Evidence is first attached to a draft, then promoted to a final report.
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
    # Ownership (exactly one must be set)
    # -----------------------------
    verification_draft = models.ForeignKey(
        FieldVerificationDraft,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="media",
    )

    verification_report = models.ForeignKey(
        FieldVerificationReport,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="media",
    )

    # -----------------------------
    # Cloudinary reference
    # -----------------------------
    public_id = models.CharField(
        max_length=255,
        help_text="Cloudinary public_id for the asset",
    )

    secure_url = models.URLField(
        help_text="Secure Cloudinary URL",
    )

    resource_type = models.CharField(
        max_length=20,
        choices=[
            ("image", "Image"),
            ("video", "Video"),
        ],
        default="image",
    )

    format = models.CharField(
        max_length=20,
        blank=True,
    )

    width = models.PositiveIntegerField(null=True, blank=True)
    height = models.PositiveIntegerField(null=True, blank=True)
    bytes = models.PositiveIntegerField(null=True, blank=True)

    # -----------------------------
    # Meta
    # -----------------------------
    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="uploaded_verification_evidence",
    )

    uploaded_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    # -----------------------------
    # Validation & integrity
    # -----------------------------
    def clean(self):
        # Enforce XOR ownership
        if bool(self.verification_draft) == bool(self.verification_report):
            raise ValidationError(
                "Evidence must belong to exactly one of draft or report."
            )

    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=VerificationEvidence,
                field_name="reference_id",
                prefix="EVD",
                padding=10,
            )
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Evidence {self.reference_id}"