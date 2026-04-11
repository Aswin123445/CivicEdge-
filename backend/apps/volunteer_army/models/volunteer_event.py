import uuid
from django.db import models
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from django.utils import timezone
from datetime import timedelta
from shared.utils.generate_reference_id import generate_reference_id

User = get_user_model()



class EventStatus(models.TextChoices):
    DRAFT = "DRAFT", "Draft"
    PUBLISHED = "PUBLISHED", "Published"
    CANCELLED = "CANCELLED", "Cancelled"
    
    
    
ALLOWED_EVENT_TRANSITIONS = {
    EventStatus.DRAFT: {EventStatus.PUBLISHED, EventStatus.CANCELLED},
    EventStatus.PUBLISHED: {EventStatus.CANCELLED},
    EventStatus.CANCELLED: set(),
}

class VolunteerEvent(models.Model):

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
    group = models.ForeignKey(
        "VolunteerGroup",
        on_delete=models.CASCADE,
        related_name="events",
    )

    # -----------------------------
    # Event info
    # -----------------------------
    title = models.CharField(max_length=255)

    description = models.TextField(blank=True)

    location_name = models.CharField(max_length=255)

    location_address = models.TextField()

    start_time = models.DateTimeField()

    end_time = models.DateTimeField()
    
    reminder_sent = models.BooleanField(default=False)

    capacity = models.PositiveIntegerField()

    # -----------------------------
    # Lifecycle
    # -----------------------------
    status = models.CharField(
        max_length=20,
        choices=EventStatus.choices,
        default=EventStatus.DRAFT,
        db_index=True,
    )

    # -----------------------------
    # Sponsorship
    # -----------------------------
    sponsor_name = models.CharField(
        max_length=255,
        blank=True,
        help_text="Name of the sponsoring organization",
    )

    sponsor_logo_url = models.URLField(
        blank=True,
        help_text="Logo URL of the sponsor",
    )

    sponsor_website = models.URLField(
        blank=True,
        help_text="Website of the sponsor",
    )
    
    sponsor_message = models.TextField(
        blank=True,
        help_text="Sponsor message or contribution details",
    )
    created_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="created_volunteer_events",
    )

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
        if self.start_time >= self.end_time:
            raise ValidationError("start_time must be before end_time.")

        minimum_start_time = timezone.now() + timedelta(hours=4)
        if self.start_time < minimum_start_time:
            raise ValidationError(
                "start_time must be at least 4 hours from now."
            )

    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=VolunteerEvent,
                field_name="reference_id",
                prefix="VMP",
                padding=10,
            )

        validate = kwargs.pop("validate", True)

        if validate:
            self.full_clean()

        super().save(*args, **kwargs)

    # -----------------------------
    # Admin actions
    # -----------------------------
    def publish(self, *, by):
        if not by.is_staff:
            raise ValidationError("Only admin can publish events.")

        if self.status != EventStatus.DRAFT:
            raise ValidationError("Event must be draft to publish.")

        minimum_start_time = timezone.now() + timedelta(hours=24)

        if self.start_time < minimum_start_time:
            raise ValidationError(
                "Event start time must be at least 24 hours from now before publishing."
            )

        self._transition(to_status=EventStatus.PUBLISHED)
    def get_runtime_status(self):
        now = timezone.now()
    
        if self.status == EventStatus.DRAFT:
            return "DRAFT"
    
        if self.status == EventStatus.CANCELLED:
            return "CANCELLED"
    
        if self.status == EventStatus.PUBLISHED:
            if now < self.start_time:
                return "UPCOMING"
            if self.start_time <= now <= self.end_time:
                return "LIVE"
            return "COMPLETED"
    
        return self.status


    def cancel(self, *, by):
        if not by.is_staff:
            raise ValidationError("Only admin can cancel events.")
    
        if self.status == EventStatus.CANCELLED:
            raise ValidationError("Event is already cancelled.")
    
        if self.get_runtime_status() == "COMPLETED":
            raise ValidationError("Completed events cannot be cancelled.")
    
        self._transition(to_status=EventStatus.CANCELLED)

    # -----------------------------
    # Internal transition helper
    # -----------------------------
    def _transition(self, *, to_status):
        allowed = ALLOWED_EVENT_TRANSITIONS.get(self.status, set())

        if to_status not in allowed:
            raise ValidationError(
                f"Invalid event transition from {self.status} to {to_status}."
            )

        self.status = to_status
        self.save()

    def __str__(self):
        return f"{self.title} ({self.status}) ({self.pk})"