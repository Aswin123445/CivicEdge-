import uuid
from django.db import models
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model
from shared.utils.generate_reference_id import generate_reference_id
User = get_user_model()

class IssueEvidence(models.Model):
    class EvidenceType(models.TextChoices):
        IMAGE = "IMAGE", "Image"
        VIDEO = "VIDEO", "Video"

    class ModerationStatus(models.TextChoices):
        PENDING = "PENDING", "Pending"
        APPROVED = "APPROVED", "Approved"
        REJECTED = "REJECTED", "Rejected"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(max_length=20, unique=True, db_index=True, editable=False)

    issue = models.ForeignKey(
        "Issue",
        on_delete=models.CASCADE,
        related_name="evidences",
    )

    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="uploaded_issue_evidence",
    )

    # --- Cloudinary references ---
    cloudinary_public_id = models.CharField(max_length=255)
    cloudinary_url = models.URLField()

    # --- File metadata ---
    evidence_type = models.CharField(
        max_length=10,
        choices=EvidenceType.choices,
        default=EvidenceType.IMAGE,
    )

    file_format = models.CharField(max_length=10)
    file_size = models.PositiveIntegerField(help_text="Size in bytes")

    width = models.PositiveIntegerField(null=True, blank=True)
    height = models.PositiveIntegerField(null=True, blank=True)

    # --- Moderation ---
    moderation_status = models.CharField(
        max_length=10,
        choices=ModerationStatus.choices,
        default=ModerationStatus.PENDING,
    )

    is_visible = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    # -----------------------------
    # Validation
    # -----------------------------

    def clean(self):
        # Limit evidence count per issue
        if self.issue_id:
            count = IssueEvidence.objects.filter(issue=self.issue).count()
            if not self.pk and count >= 5:
                raise ValidationError("Maximum 5 evidences allowed per issue.")

        # Validate size (example: 10MB max)
        if self.file_size > 10 * 1024 * 1024:
            raise ValidationError("Evidence file size exceeds 10MB limit.")

    def save(self, *args, **kwargs):
        validate = kwargs.pop("validate", True)
        if not self.reference_id:
            self.reference_id = generate_reference_id(model=IssueEvidence, field_name="reference_id", prefix="EVI", padding=10)
        if validate:
            self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.evidence_type} for Issue {self.issue_id}"