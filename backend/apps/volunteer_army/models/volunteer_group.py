import uuid
from django.db import models
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError

from shared.utils.generate_reference_id import generate_reference_id

User = get_user_model()


class VolunteerGroupStatus(models.TextChoices):
    DRAFT = "DRAFT", "Draft"
    ACTIVE = "ACTIVE", "Active"
    ARCHIVED = "ARCHIVED", "Archived"


class MembershipType(models.TextChoices):
    OPEN = "OPEN", "Open"
    APPROVAL_REQUIRED = "APPROVAL_REQUIRED", "Approval Required"


class RiskLevel(models.TextChoices):
    LOW = "LOW", "Low"
    MEDIUM = "MEDIUM", "Medium"
    HIGH = "HIGH", "High"

ALLOWED_GROUP_TRANSITIONS = {
    VolunteerGroupStatus.DRAFT: {VolunteerGroupStatus.ACTIVE,VolunteerGroupStatus.ARCHIVED},
    VolunteerGroupStatus.ACTIVE: {VolunteerGroupStatus.ARCHIVED},
    VolunteerGroupStatus.ARCHIVED: set(),
}
class VolunteerGroup(models.Model):

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

    name = models.CharField(max_length=255, unique=True)

    description = models.TextField()

    # -----------------------------
    # Configuration
    # -----------------------------
    membership_type = models.CharField(
        max_length=30,
        choices=MembershipType.choices,
        default=MembershipType.OPEN,
    )

    risk_level = models.CharField(
        max_length=20,
        choices=RiskLevel.choices,
        default=RiskLevel.LOW,
    )

    requirements = models.TextField(
        blank=True,
        help_text="Requirements needed to join this group",
    )

    # -----------------------------
    # Lifecycle
    # -----------------------------
    status = models.CharField(
        max_length=20,
        choices=VolunteerGroupStatus.choices,
        default=VolunteerGroupStatus.DRAFT,
        db_index=True,
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="created_volunteer_groups",
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
        if self.status == VolunteerGroupStatus.ACTIVE and not self.name:
            raise ValidationError("Group must have a name before activation.")
        if self._state.adding:
            return 

        previous = VolunteerGroup.objects.get(pk=self.pk)

        if self.status != previous.status:

            allowed = ALLOWED_GROUP_TRANSITIONS.get(previous.status, set())

            if self.status not in allowed:
                raise ValidationError(
                    f"Invalid transition from {previous.status} to {self.status}"
                )

    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=VolunteerGroup,
                field_name="reference_id",
                prefix="VRG",
                padding=10,
            )
        validate = kwargs.pop("validate", True)

        if validate:
            self.full_clean()

        super().save(*args, **kwargs)

    # -----------------------------
    # Admin Actions
    # -----------------------------
    def activate(self, *, by):
        if not by.is_staff:
            raise ValidationError("Only admin can activate group.")

        if self.status != VolunteerGroupStatus.DRAFT:
            raise ValidationError("Group must be in DRAFT to activate.")

        self._transition(to_status=VolunteerGroupStatus.ACTIVE)

    def archive(self, *, by):
        if not by.is_staff:
            raise ValidationError("Only admin can archive group.")

        self._transition(to_status=VolunteerGroupStatus.ARCHIVED)

    # -----------------------------
    # Transition helper
    # -----------------------------
    def _transition(self, *, to_status):
        allowed = ALLOWED_GROUP_TRANSITIONS.get(self.status, set())

        if to_status not in allowed:
            raise ValidationError(
                f"Invalid transition from {self.status} to {to_status}"
            )

        self.status = to_status
        self.save()

    def __str__(self):
        return f"{self.name} ({self.status}) ({self.id})"