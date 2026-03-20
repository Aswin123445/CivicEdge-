import uuid
from django.db import models
from django.utils import timezone
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model

from apps.volunteer_army.models.volunteer_membership import MembershipStatus
from shared.utils.generate_reference_id import generate_reference_id

User = get_user_model()


class ParticipationStatus(models.TextChoices):
    REGISTERED = "REGISTERED", "Registered"
    ATTENDANCE_SUBMITTED = "ATTENDANCE_SUBMITTED", "Attendance Submitted"
    VERIFIED = "VERIFIED", "Verified"
    REJECTED = "REJECTED", "Rejected"
    NO_SHOW = "NO_SHOW", "No Show"
    LEFT = "LEFT", "Left"




ALLOWED_PARTICIPATION_TRANSITIONS = {
    ParticipationStatus.REGISTERED: {
        ParticipationStatus.ATTENDANCE_SUBMITTED,
        ParticipationStatus.NO_SHOW,
        ParticipationStatus.LEFT,
    },
    ParticipationStatus.ATTENDANCE_SUBMITTED: {
        ParticipationStatus.VERIFIED,
        ParticipationStatus.REJECTED,
    },
    ParticipationStatus.VERIFIED: set(),
    ParticipationStatus.REJECTED: set(),
    ParticipationStatus.NO_SHOW: set(),
    ParticipationStatus.LEFT: set(),
}


class EventParticipation(models.Model):
    @classmethod
    def join_event(cls, *, event, membership):
        from apps.volunteer_army.models.volunteer_event import EventStatus

        if membership.status != MembershipStatus.ACTIVE:
            raise ValidationError("Only active members can join events.")

        if membership.group_id != event.group_id:
            raise ValidationError("Membership does not belong to this event group.")

        if event.status != EventStatus.PUBLISHED:
            raise ValidationError("Only published events can be joined.")

        if event.get_runtime_status() != "UPCOMING":
            raise ValidationError("Only upcoming events can be joined.")

        already_joined = cls.objects.filter(event=event, membership=membership).exists()
        if already_joined:
            raise ValidationError("You have already joined this event.")

        current_count = cls.objects.filter(
            event=event,
            status=ParticipationStatus.REGISTERED,
        ).count()

        if current_count >= event.capacity:
            raise ValidationError("Event capacity has been reached.")

        return cls.objects.create(
            event=event,
            membership=membership,
            status=ParticipationStatus.REGISTERED,
        )

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
    event = models.ForeignKey(
        "VolunteerEvent",
        on_delete=models.CASCADE,
        related_name="participations",
    )

    membership = models.ForeignKey(
        "VolunteerMembership",
        on_delete=models.CASCADE,
        related_name="event_participations",
    )

    # -----------------------------
    # Lifecycle
    # -----------------------------
    status = models.CharField(
        max_length=30,
        choices=ParticipationStatus.choices,
        default=ParticipationStatus.REGISTERED,
        db_index=True,
    )

    registered_at = models.DateTimeField(auto_now_add=True)

    # -----------------------------
    # Attendance
    # -----------------------------
    attendance_evidence_url = models.URLField(
        blank=True,
        null=True,
    )

    attendance_submitted_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    # -----------------------------
    # Admin verification
    # -----------------------------
    verified_by = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.PROTECT,
        related_name="verified_event_participations",
    )

    verified_at = models.DateTimeField(null=True, blank=True)

    verification_note = models.TextField(blank=True)

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
                fields=["event", "membership"],
                name="unique_event_membership_participation",
            )
        ]

    # -----------------------------
    # Validation
    # -----------------------------
    def clean(self):
        from apps.volunteer_army.models.volunteer_membership import MembershipStatus

        if self.membership.status != MembershipStatus.ACTIVE:
            raise ValidationError("Only active members can participate.")

        if self.membership.group_id != self.event.group_id:
            raise ValidationError("Membership group must match the event group.")

    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=EventParticipation,
                field_name="reference_id",
                prefix="EVP",
                padding=10,
            )
        validate = kwargs.pop("validate", True)

        if validate:
            self.full_clean()

        super().save(*args, **kwargs)

    # -----------------------------
    # Citizen actions
    # -----------------------------
    def submit_attendance(self, *, evidence_url, by):
        if by != self.membership.user:
            raise ValidationError("Only the participant can submit attendance.")

        if self.status != ParticipationStatus.REGISTERED:
            raise ValidationError("Attendance already submitted.")

        if self.event.get_runtime_status() != "LIVE":
            raise ValidationError(
                "Attendance can only be submitted while the event is live."
            )

        self.attendance_evidence_url = evidence_url
        self.attendance_submitted_at = timezone.now()

        self._transition(to_status=ParticipationStatus.ATTENDANCE_SUBMITTED)
        
    def leave(self, *, by):
        if by != self.membership.user:
            raise ValidationError("Only the participant can leave this event.")

        if self.status != ParticipationStatus.REGISTERED:
            raise ValidationError("Only registered participation can be left.")

        if self.event.get_runtime_status() != "UPCOMING":
            raise ValidationError("You can only leave an event before it goes live.")

        self._transition(to_status=ParticipationStatus.LEFT)

    # -----------------------------
    # Admin actions
    # -----------------------------
    def verify(self, *, by):

        if not by.is_staff:
            raise ValidationError("Only admin can verify attendance.")

        if self.status != ParticipationStatus.ATTENDANCE_SUBMITTED:
            raise ValidationError("Attendance must be submitted.")

        self.verified_by = by
        self.verified_at = timezone.now()

        self._transition(to_status=ParticipationStatus.VERIFIED)

    def reject(self, *, by):
        if not by.is_staff:
            raise ValidationError("Only admin can reject attendance.")

        if self.status != ParticipationStatus.ATTENDANCE_SUBMITTED:
            raise ValidationError("Attendance must be submitted before rejection.")

        self._transition(to_status=ParticipationStatus.REJECTED)

    def mark_no_show(self, *, by):

        if not by.is_staff:
            raise ValidationError("Only admin can mark no show.")

        if self.status != ParticipationStatus.REGISTERED:
            raise ValidationError("Cannot mark no show.")

        self._transition(to_status=ParticipationStatus.NO_SHOW)

    # -----------------------------
    # Transition helper
    # -----------------------------
    def _transition(self, *, to_status):
        allowed = ALLOWED_PARTICIPATION_TRANSITIONS.get(self.status, set())

        if to_status not in allowed:
            raise ValidationError(
                f"Invalid participation transition from {self.status} to {to_status}."
            )

        self.status = to_status
        self.save()

    def __str__(self):
        return f"{self.event_id} → {self.membership_id} ({self.status})  {self.pk}"
