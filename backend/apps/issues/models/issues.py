import uuid
from rest_framework.exceptions import ValidationError
from django.db import models
from apps.issues.utils.enums.issue_status import IssueStatus
from django.contrib.auth import get_user_model
from shared.utils.generate_reference_id import generate_reference_id
from django.utils import timezone
from apps.issues.models.issue_status_history import IssueStatusHistory 
from apps.issues.models.issue_log import IssueLog

ALLOWED_TRANSITIONS = {
    IssueStatus.OPEN: {
        IssueStatus.IN_REVIEW,
        IssueStatus.CANCELLED,
        IssueStatus.REJECTED,
    },

    IssueStatus.IN_REVIEW: {
        IssueStatus.IN_PROGRESS,
        IssueStatus.REJECTED,
        IssueStatus.POSTPONED,
    },

    IssueStatus.POSTPONED: {
        IssueStatus.IN_PROGRESS,
    },

    IssueStatus.IN_PROGRESS: {
        IssueStatus.RESOLVED,
    },

    IssueStatus.RESOLVED: {
        IssueStatus.CLOSED,
        IssueStatus.REOPENED,  # optional, if citizen disputes resolution
    },

    IssueStatus.CLOSED: {
        IssueStatus.REOPENED,
    },

    IssueStatus.REOPENED: {
        IssueStatus.IN_REVIEW,
    },

    # Terminal states (no outgoing transitions)
    IssueStatus.CANCELLED: set(),
    IssueStatus.REJECTED: set(),
}

User = get_user_model()
class Issue(models.Model):
    class DraftStep(models.TextChoices):
        BASIC = "BASIC", "Basic details"
        LOCATION = "LOCATION", "Location"
        EVIDENCE = "EVIDENCE", "Evidence"
        BEHAVIOR = "BEHAVIOR", "Behavioral Questions"
        REVIEW = "REVIEW", "Review & Submit"
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(
        max_length=20,
        unique=True,
        db_index=True,
        editable=False,
    )
    # --- Identity ---

    is_draft = models.BooleanField(default=True)
    draft_step = models.CharField(
        max_length=30,
        choices=DraftStep.choices,
        default=DraftStep.BASIC,
    )
    reporter = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="reported_issues",
    )

    # --- Core content ---
    title = models.CharField(max_length=255)
    description = models.TextField()

    # --- Classification ---
    category = models.ForeignKey(
        "IssueCategory",
        on_delete=models.PROTECT,
        related_name="issues",
    )

    # --- State ---
    status = models.CharField(
        max_length=20,
        choices=IssueStatus.choices,
        default=IssueStatus.OPEN,
        db_index=True,
    )

    cancelled_at = models.DateTimeField(null=True, blank=True)

    # --- Meta ---
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # -----------------------------
    # Validation & Integrity
    # -----------------------------

    def clean(self):
        """
        Enforces lifecycle rules and immutability guarantees.
        """
        if not Issue.objects.filter(pk=self.pk).exists():
            return  # new object, no previous state

        previous = Issue.objects.filter(pk=self.pk).first()

        # Prevent reporter mutation
        if self.reporter_id != previous.reporter_id:
            raise ValidationError("Reporter cannot be changed once set.")

        # Prevent identity mutation after acknowledgement
        if previous.status != IssueStatus.OPEN:
            immutable_fields = ["title", "description", "category_id", "location"]
            for field in immutable_fields:
                if getattr(self, field) != getattr(previous, field):
                    raise ValidationError(
                        f"{field.replace('_', ' ').title()} cannot be modified after acknowledgment."
                    )

        #  Validate status transitions
        if self.status != previous.status:
            allowed = ALLOWED_TRANSITIONS.get(previous.status, set())
            if self.status not in allowed:
                raise ValidationError(
                    f"Invalid status transition from {previous.status} to {self.status}"
                )

        #  Cancelled must have cancelled_at
        if self.status == IssueStatus.CANCELLED and not self.cancelled_at:
            raise ValidationError("cancelled_at must be set when issue is cancelled.")

    def save(self, *args, **kwargs):
        validate = kwargs.pop("validate", True)
        if not self.reference_id:
            self.reference_id = generate_reference_id(model=Issue, field_name="reference_id", prefix="ISU", padding=10)
        if validate:
            self.full_clean()
        super().save(*args, **kwargs)
    def _transition(self, *, to_status, by, reason=None):
        previous_status = self.status

        self.status = to_status
        if to_status == IssueStatus.CANCELLED:
            self.cancelled_at = timezone.now()

        self.save()

        # --- Status History (AUDIT) ---
        IssueStatusHistory.objects.create(
            issue=self,
            from_status=previous_status,
            to_status=to_status,
            changed_by=by,
            reason=reason or "",
        )

        # --- Issue Log (TIMELINE) ---
        if to_status == IssueStatus.IN_REVIEW:
            event = IssueLog.EventType.ACKNOWLEDGED
        elif to_status == IssueStatus.REJECTED:
            event = IssueLog.EventType.REJECTED
        elif to_status == IssueStatus.RESOLVED:
            event = IssueLog.EventType.RESOLVED
        elif to_status == IssueStatus.REOPENED:
            event = IssueLog.EventType.REOPENED
        elif to_status == IssueStatus.CANCELLED:
            event = IssueLog.EventType.CANCELLED
        else:
            event = None

        if event:
            IssueLog.objects.create(
                issue=self,
                event_type=event,
                actor=by,
            )

    # -----------------------------
    # Domain Methods (ONLY way to mutate status)
    # -----------------------------

    def submit(self, *, by):
        """
        Called when a citizen completes and submits a complaint.
        """
        if self.status != IssueStatus.OPEN:
            raise ValidationError("Only open issues can be submitted for review.")

        self._transition(
            to_status=IssueStatus.IN_REVIEW,
            by=by,
        )

    def cancel(self, *, by, reason=None):
        """
        Citizen cancels before work starts.
        """
        if self.status not in {IssueStatus.OPEN, IssueStatus.IN_REVIEW}:
            raise ValidationError("This issue can no longer be cancelled.")

        self._transition(
            to_status=IssueStatus.CANCELLED,
            by=by,
            reason=reason,
        )

    # ----------------------------
    # Admin Actions
    # ----------------------------

    def move_to_review(self, *, by):
        """
        Explicit admin action to place issue under review
        (mostly useful for reopened issues).
        """
        if self.status not in {IssueStatus.OPEN, IssueStatus.REOPENED}:
            raise ValidationError("Issue cannot be moved to review from current state.")

        self._transition(
            to_status=IssueStatus.IN_REVIEW,
            by=by,
        )

    def start_progress(self, *, by):
        """
        Called when admin assigns a solver and work begins.
        """
        if self.status not in  {IssueStatus.IN_REVIEW, IssueStatus.POSTPONED}:
            raise ValidationError("Work can only start on issues under review or postponed.")

        self._transition(
            to_status=IssueStatus.IN_PROGRESS,
            by=by,
        )

    def move_postpone(self, *, by):
        """
        Called when admin assigns a solver and work begins.
        """
        if self.status != IssueStatus.IN_REVIEW:
            raise ValidationError("Only Postpone can be done on issues under review.")

        self._transition(
            to_status=IssueStatus.POSTPONED,
            by=by,
        )

    def reject(self, *, by, reason=None):
        """
        Admin rejects the issue during review.
        """
        if self.status != IssueStatus.IN_REVIEW:
            raise ValidationError("Only issues under review can be rejected.")

        self._transition(
            to_status=IssueStatus.REJECTED,
            by=by,
            reason=reason,
        )

    # ----------------------------
    # Solver / Resolution Actions
    # ----------------------------

    def resolve(self, *, by):
        """
        Solver marks work as completed.
        """
        if self.status != IssueStatus.IN_PROGRESS:
            raise ValidationError("Only issues in progress can be resolved.")

        self._transition(
            to_status=IssueStatus.RESOLVED,
            by=by,
        )

    def close(self, *, by):
        """
        Admin closes a resolved issue.
        """
        if self.status != IssueStatus.RESOLVED:
            raise ValidationError("Only resolved issues can be closed.")

        self._transition(
            to_status=IssueStatus.CLOSED,
            by=by,
        )

    def reopen(self, *, by, reason=None):
        """
        Citizen or admin reopens a closed/resolved issue.
        """
        if self.status not in {IssueStatus.CLOSED, IssueStatus.RESOLVED}:
            raise ValidationError("Only closed or resolved issues can be reopened.")

        self._transition(
            to_status=IssueStatus.REOPENED,
            by=by,
            reason=reason,
        )

    # ----------------------------

    def __str__(self):
        return f"{self.title} ({self.get_status_display()})"
