import uuid
from django.db import models
from shared.utils.generate_reference_id import generate_reference_id


class Contractor(models.Model):
    """
    Reference model for third-party contractors involved in execution.
    Contractors do not participate in workflow; they are metadata only.
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
    # Core details
    # -----------------------------
    name = models.CharField(
        max_length=255,
        help_text="Registered or commonly used contractor name",
    )

    contact_person = models.CharField(
        max_length=255,
        blank=True,
    )

    contact_phone = models.CharField(
        max_length=20,
        blank=True,
    )

    contact_email = models.EmailField(
        blank=True,
    )

    # -----------------------------
    # Optional classification
    # -----------------------------
    specialization = models.CharField(
        max_length=255,
        blank=True,
        help_text="Type of work the contractor usually handles",
    )

    is_active = models.BooleanField(
        default=True,
        help_text="Inactive contractors cannot be newly assigned",
    )

    # -----------------------------
    # Meta
    # -----------------------------
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # -----------------------------
    # Integrity
    # -----------------------------
    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=Contractor,
                field_name="reference_id",
                prefix="CTR",
                padding=10,
            )
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.reference_id} {self.pk})"