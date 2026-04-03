import uuid

from django.db import models
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError

from shared.utils.generate_reference_id import generate_reference_id

User = get_user_model()


class RecognitionType(models.TextChoices):
    EVENT_PARTICIPATION_CERTIFICATE = (
        "EVENT_PARTICIPATION_CERTIFICATE",
        "Event Participation Certificate",
    )


class RecognitionStatus(models.TextChoices):
    PENDING = "PENDING", "Pending"
    GENERATED = "GENERATED", "Generated"
    FAILED = "FAILED", "Failed"


class VolunteerRecognition(models.Model):
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
    # Relationships
    # -----------------------------
    participation = models.OneToOneField(
        "EventParticipation",
        on_delete=models.CASCADE,
        related_name="recognition",
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="volunteer_recognitions",
    )

    event = models.ForeignKey(
        "VolunteerEvent",
        on_delete=models.CASCADE,
        related_name="recognitions",
    )

    # -----------------------------
    # Recognition info
    # -----------------------------
    recognition_type = models.CharField(
        max_length=50,
        choices=RecognitionType.choices,
        default=RecognitionType.EVENT_PARTICIPATION_CERTIFICATE,
    )

    status = models.CharField(
        max_length=20,
        choices=RecognitionStatus.choices,
        default=RecognitionStatus.PENDING,
    )

    certificate_url = models.URLField(null=True, blank=True)

    # -----------------------------
    # Issuance
    # -----------------------------
    issued_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="issued_volunteer_recognitions",
        null=True,
        blank=True,
    )

    issued_at = models.DateTimeField(auto_now_add=True)
    emailed_at = models.DateTimeField(null=True, blank=True)

    # -----------------------------
    # Meta
    # -----------------------------
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # -----------------------------
    # Validation
    # -----------------------------
    def clean(self):
        if self.user != self.participation.membership.user:
            raise ValidationError("User mismatch in recognition.")

        if self.event != self.participation.event:
            raise ValidationError("Event mismatch in recognition.")

    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=VolunteerRecognition,
                field_name="reference_id",
                prefix="VMP",
                padding=10,
            )

        validate = kwargs.pop("validate", True)
        if validate:
            self.full_clean()

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user} - {self.event} ({self.recognition_type})"