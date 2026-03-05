from django.db import models
import uuid
from shared.utils.generate_reference_id import generate_reference_id
from django.contrib.auth import get_user_model
User = get_user_model()
class IssueLog(models.Model):
    class EventType(models.TextChoices):
        CREATED = "CREATED", "Issue Created"
        CANCELLED = "CANCELLED", "Issue Cancelled"
        ACKNOWLEDGED = "ACKNOWLEDGED", "Issue Acknowledged"
        REJECTED = "REJECTED", "Issue Rejected"
        RESOLVED = "RESOLVED", "Issue Resolved"
        REOPENED = "REOPENED", "Issue Reopened"
        EVIDENCE_ADDED = "EVIDENCE_ADDED", "Evidence Added"
        EVIDENCE_REJECTED = "EVIDENCE_REJECTED", "Evidence Rejected"
        POST_PONED = "POST_PONED", "Issue Postponed"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(max_length=20, unique=True, db_index=True, editable=False)
    issue = models.ForeignKey(
        "Issue",
        on_delete=models.CASCADE,
        related_name="logs",
    )

    event_type = models.CharField(
        max_length=30,
        choices=EventType.choices,
    )

    actor = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
    )

    metadata = models.JSONField(blank=True, default=dict)

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        validate = kwargs.pop("validate", True)
        if not self.reference_id:
            self.reference_id = generate_reference_id(model=IssueLog, field_name="reference_id", prefix="ISL", padding=10)
        if validate:
            self.full_clean()
        super().save(*args, **kwargs)
        
    def __str__(self):
        return f"{self.reference_id} - {self.issue.title}"

    class Meta:
        ordering = ["created_at"]
        
        
class IssueStats(models.Model):
    issue = models.OneToOneField(
        "Issue",
        on_delete=models.CASCADE,
        related_name="stats",
    )

    evidence_count = models.PositiveIntegerField(default=0)
    approved_evidence_count = models.PositiveIntegerField(default=0)

    days_open = models.PositiveIntegerField(default=0)

    last_activity_at = models.DateTimeField(null=True, blank=True)

    updated_at = models.DateTimeField(auto_now=True)

