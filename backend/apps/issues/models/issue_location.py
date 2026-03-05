import uuid
from django.db import models
from rest_framework.exceptions import ValidationError
from shared.utils.generate_reference_id import generate_reference_id

class IssueLocation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(max_length=20, unique=True, db_index=True, editable=False)
    # --- Map pin coordinates ---
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6
    )
    issue = models.OneToOneField(
        "Issue",
        on_delete=models.CASCADE,
        related_name="location",
        default=None,
    )

    # --- Administrative area ---
    zone = models.ForeignKey(
        "user.Zone",  # or Zone / Locality
        on_delete=models.PROTECT,
        related_name="issue_locations",
    )

    # --- Human context ---
    landmark_description = models.CharField(
        max_length=255,
        blank=True,
        help_text="Optional public landmark (e.g., Near bus stop)"
    )

    # --- GPS quality ---
    accuracy_radius = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Accuracy radius in meters (if available)"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    # -----------------------------
    # Validation
    # -----------------------------

    def clean(self):
        if not (-90 <= float(self.latitude) <= 90):
            raise ValidationError("Latitude must be between -90 and 90.")

        if not (-180 <= float(self.longitude) <= 180):
            raise ValidationError("Longitude must be between -180 and 180.")
        
    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(model=IssueLocation, field_name="reference_id", prefix="LOC", padding=10)
        validate = kwargs.pop("validate", True)
        if validate:
            self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.latitude}, {self.longitude} ({self.zone.name})"
