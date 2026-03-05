from django.db import models
from apps.issues.models.issues import Issue
from django.contrib.auth import get_user_model
import uuid

from shared.utils.generate_reference_id import generate_reference_id
User = get_user_model()
class IssueTimelineEvent(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(
        max_length=20,
        unique=True,
        db_index=True,
        editable=False,
    )
    issue = models.ForeignKey(
        Issue,
        on_delete=models.CASCADE,
        related_name="timeline_events",
    )

    message = models.TextField()

    created_by = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.reference_id} - {self.issue.title}"
    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(model=IssueTimelineEvent, field_name="reference_id", prefix="TLN", padding=10)
        super().save(*args, **kwargs)
