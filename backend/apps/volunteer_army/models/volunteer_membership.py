import uuid
from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError

from apps.volunteer_army.models.volunteer_group import MembershipType, VolunteerGroupStatus
from shared.utils.generate_reference_id import generate_reference_id

User = get_user_model()


class MembershipStatus(models.TextChoices):
    PENDING = "PENDING", "Pending"
    SUBMITTED = "SUBMITTED", "Submitted"
    ACTIVE = "ACTIVE", "Active"
    REJECTED = "REJECTED", "Rejected"
    LEFT = "LEFT", "Left"
    REMOVED = "REMOVED", "Removed"
    
ALLOWED_MEMBERSHIP_TRANSITIONS = {
    MembershipStatus.PENDING: {
        MembershipStatus.SUBMITTED,
        MembershipStatus.LEFT,
    },
    MembershipStatus.SUBMITTED: {
        MembershipStatus.ACTIVE,
        MembershipStatus.REJECTED,
    },
    MembershipStatus.ACTIVE: {
        MembershipStatus.LEFT,
        MembershipStatus.REMOVED,
    },
    MembershipStatus.REJECTED: set(),
    MembershipStatus.LEFT: set(),
    MembershipStatus.REMOVED: set(),
}


class VolunteerMembership(models.Model):

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
    # Relationship
    # -----------------------------
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="volunteer_memberships",
    )

    group = models.ForeignKey(
        "VolunteerGroup",
        on_delete=models.CASCADE,
        related_name="memberships",
    )

    # -----------------------------
    # Application context
    # -----------------------------
    application_note = models.TextField(blank=True)

    # -----------------------------
    # Lifecycle
    # -----------------------------
    status = models.CharField(
        max_length=20,
        choices=MembershipStatus.choices,
        default=MembershipStatus.PENDING,
        db_index=True,
    )
    rejection_reason = models.TextField(null=True, blank=True)
    joined_at = models.DateTimeField(null=True, blank=True)

    # -----------------------------
    # Admin review
    # -----------------------------
    reviewed_by = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.PROTECT,
        related_name="reviewed_memberships",
    )

    reviewed_at = models.DateTimeField(null=True, blank=True)

    review_note = models.TextField(blank=True)

    # -----------------------------
    # Control
    # -----------------------------
    is_active = models.BooleanField(default=True)

    # -----------------------------
    # Meta
    # -----------------------------
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "group"],
                name="unique_user_group_membership",
            )
        ]

    # -----------------------------
    # Validation
    # -----------------------------
    def validate_status_transition(self):
        if self._state.adding:
            return

        old_status = type(self).objects.only("status").get(pk=self.pk).status
        new_status = self.status

        if old_status == new_status:
            return

        allowed = ALLOWED_MEMBERSHIP_TRANSITIONS.get(old_status, set())
        if new_status not in allowed:
            raise ValidationError(
                {"status": f"Invalid transition from {old_status} to {new_status}."}
            )
    def clean(self):
        if self._state.adding:
            if self.group.status != VolunteerGroupStatus.ACTIVE:
                raise ValidationError("Group must be active before joining.")
            
            if self.group.membership_type == MembershipType.APPROVAL_REQUIRED and self.status != MembershipStatus.PENDING:
                raise ValidationError("Membership must be pending before joining.")

        self.validate_status_transition()

    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=VolunteerMembership,
                field_name="reference_id",
                prefix="VMP",
                padding=10,
            )
        validate = kwargs.pop("validate", True)

        if validate:
            self.full_clean()

        super().save(*args, **kwargs)

    # -----------------------------
    # Citizen actions
    # -----------------------------
    def leave(self, *, by):
        if by != self.user:
            raise ValidationError("Only the member can leave.")

        if self.status not in [MembershipStatus.ACTIVE, MembershipStatus.PENDING]:
            raise ValidationError("Only pending or active memberships can be left.")

        self._transition(to_status=MembershipStatus.LEFT)

    # -----------------------------
    # Admin actions
    # -----------------------------
    def approve(self, *, by):
        if not by.is_staff:
            raise ValidationError("Only admin can approve membership.")

        if self.status != MembershipStatus.SUBMITTED:
            raise ValidationError("Membership must be submitted.")

        if self.group.membership_type == MembershipType.APPROVAL_REQUIRED:
            if not self.evidences.exists():
                raise ValidationError("Evidence required before approval.")

        self.joined_at = timezone.now()
        self.reviewed_by = by
        self.reviewed_at = timezone.now()

        self._transition(to_status=MembershipStatus.ACTIVE)

    def reject(self, *, by, reason):
        if not by.is_staff:
            raise ValidationError("Only admin can reject membership.")

        if self.status != MembershipStatus.SUBMITTED:
            raise ValidationError("Membership must be SUBMITTED.")

        if not reason:
            raise ValidationError("Rejection reason is required.")

        self.reviewed_by = by
        self.reviewed_at = timezone.now()
        self.rejection_reason = reason

        self._transition(to_status=MembershipStatus.REJECTED)

    def remove(self, *, by):
        if not by.is_staff:
            raise ValidationError("Only admin can remove members.")

        if self.status != MembershipStatus.ACTIVE:
            raise ValidationError("Only active memberships can be removed.")

        self._transition(to_status=MembershipStatus.REMOVED)
    def submit_for_review(self, *, by):
        if self.user != by:
            raise ValidationError("You can only submit your own membership.")

        if self.group.membership_type != MembershipType.APPROVAL_REQUIRED:
            raise ValidationError("This membership does not require submission.")
    
        if self.status != MembershipStatus.PENDING:
            raise ValidationError("Only pending memberships can be submitted.")
    
        if not self.evidences.exists():
            raise ValidationError("At least one evidence is required before submission.")

        self._transition(to_status=MembershipStatus.SUBMITTED)

    # -----------------------------
    # Transition helper
    # -----------------------------
    def _transition(self, *, to_status):
        allowed = ALLOWED_MEMBERSHIP_TRANSITIONS.get(self.status, set())
        if to_status not in allowed:
            raise ValidationError(
                f"Invalid transition from {self.status} to {to_status}."
        )
        self.status = to_status
        self.save()

    def __str__(self):
        return f"{self.user} → {self.group} ({self.status}) ({self.pk})"