import uuid
from django.db import models
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError

from shared.utils.generate_reference_id import generate_reference_id
from apps.volunteer_army.models.event_participation import ParticipationStatus

User = get_user_model()


class VolunteerServiceLog(models.Model):
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
        related_name="service_log",
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="volunteer_service_logs",
    )

    event = models.ForeignKey(
        "VolunteerEvent",
        on_delete=models.CASCADE,
        related_name="service_logs",
    )

    # -----------------------------
    # Service details
    # -----------------------------
    service_hours = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        help_text="Total hours contributed",
    )

    description = models.TextField(blank=True)

    # -----------------------------
    # Logging info
    # -----------------------------
    logged_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="logged_service_entries",
    )

    logged_at = models.DateTimeField(auto_now_add=True)

    # -----------------------------
    # Control
    # -----------------------------
    is_active = models.BooleanField(default=True)

    # -----------------------------
    # Meta
    # -----------------------------
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # -----------------------------
    # Validation
    # -----------------------------
    def clean(self):
        if not self.participation_id:
            raise ValidationError("Participation is required.")

        if self.participation.status != ParticipationStatus.VERIFIED:
            raise ValidationError(
                "Service log can only be created for verified participation."
            )

        if self.user_id != self.participation.membership.user_id:
            raise ValidationError("User mismatch.")

        if self.event_id != self.participation.event_id:
            raise ValidationError("Event mismatch.")

        if self.service_hours is None or self.service_hours <= 0:
            raise ValidationError("Service hours must be greater than zero.")

    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=VolunteerServiceLog,
                field_name="reference_id",
                prefix="VSL",
                padding=10,
            )

        validate = kwargs.pop("validate", True)
        if validate:
            self.full_clean()

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user} - {self.service_hours}h ({self.event})"