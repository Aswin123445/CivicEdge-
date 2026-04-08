import uuid
from django.db import models
from django.utils.timezone import now
from django.contrib.auth import get_user_model
from shared.utils.generate_reference_id import generate_reference_id
from django.core.exceptions import ValidationError as DjangoValidationError

User = get_user_model()


class Status(models.TextChoices):
    ACTIVE = "active", "Active"
    CLOSED = "closed", "Closed"
    EXPIRED = "expired", "Expired"


class Poll(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(
        max_length=20, unique=True, db_index=True, editable=False
    )
    question = models.TextField()

    # Behavioral layer
    context = models.TextField(blank=True, null=True)
    did_you_know = models.TextField(blank=True, null=True)

    image_url = models.URLField(blank=True, null=True)

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="created_polls",
    )

    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.ACTIVE,
    )

    expires_at = models.DateTimeField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "polls"
        ordering = ["-created_at"]

    def clean(self):
        if self.expires_at and self.expires_at <= now():
            raise DjangoValidationError("Expiry must be in the future")

    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=Poll, field_name="reference_id", prefix="POL", padding=10
            )
        self.full_clean()
        super().save(*args, **kwargs)

    @property
    def effective_status(self):
        if (self.status == Status.CLOSED) or (
            self.expires_at and self.expires_at < now()
        ):
            return "closed"

        return "active"

    @property
    def is_expired(self):
        return self.expires_at and self.expires_at < now()

    @property
    def is_active(self):
        return self.status == Status.ACTIVE and not self.is_expired

    def __str__(self):
        return f"{self.question} self.question or Poll {self.id}"
