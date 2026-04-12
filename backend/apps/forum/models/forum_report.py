import uuid
from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError

from shared.utils.generate_reference_id import generate_reference_id


class ReportStatus(models.TextChoices):
    PENDING = "pending", "Pending"
    REVIEWED = "reviewed", "Reviewed"
    RESOLVED = "resolved", "Resolved"
    REJECTED = "rejected", "Rejected"


class ReportTargetType(models.TextChoices):
    POST = "post", "Post"
    COMMENT = "comment", "Comment"


class ForumReport(models.Model):
    """
    Represents a user report on forum content (post/comment).
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(max_length=20, unique=True, db_index=True, editable=False)
    
    reported_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="forum_reports",
    )

    target_type = models.CharField(
        max_length=20,
        choices=ReportTargetType.choices,
    )

    target_id = models.UUIDField()

    reason = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=ReportStatus.choices,
        default=ReportStatus.PENDING,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=ForumReport,
                field_name="reference_id",
                prefix="FR  C",
                padding=10,
            )
        super().save(*args, **kwargs)
    def clean(self):
        from forum.models import ForumPost, ForumComment

        if self.target_type == ReportTargetType.POST:
            if not ForumPost.objects.filter(id=self.target_id).exists():
                raise ValidationError("Invalid post ID")

        elif self.target_type == ReportTargetType.COMMENT:
            if not ForumComment.objects.filter(id=self.target_id).exists():
                raise ValidationError("Invalid comment ID")
    class Meta:
        db_table = "forum_reports"
        indexes = [
            models.Index(fields=["target_type", "target_id"]),
            models.Index(fields=["status"]),
        ]
        unique_together = ("reported_by", "target_type", "target_id")  # prevent spam

    def __str__(self):
        return f"{self.reported_by_id} → {self.target_type}:{self.target_id}"