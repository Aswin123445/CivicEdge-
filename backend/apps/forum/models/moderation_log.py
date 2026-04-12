import uuid
from django.db import models
from django.conf import settings

from shared.utils.generate_reference_id import generate_reference_id


class ModerationAction(models.TextChoices):
    HIDE = "hide", "Hide"
    REMOVE = "remove", "Remove"
    RESTORE = "restore", "Restore"
    WARN = "warn", "Warn"


class ModerationTargetType(models.TextChoices):
    POST = "post", "Post"
    COMMENT = "comment", "Comment"
    USER = "user", "User"


class ModerationLog(models.Model):
    """
    Tracks moderation actions performed by admins.
    Acts as an audit log.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(max_length=20, unique=True, db_index=True, editable=False)  

    moderator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="moderation_actions",
    )

    target_type = models.CharField(
        max_length=20,
        choices=ModerationTargetType.choices,
    )

    target_id = models.UUIDField()

    action = models.CharField(
        max_length=20,
        choices=ModerationAction.choices,
    )

    reason = models.TextField(blank=True)

    metadata = models.JSONField(default=dict, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=ModerationLog,
                field_name="reference_id",
                prefix="ML  C",
                padding=10,
            )
        super().save(*args, **kwargs)

    class Meta:
        db_table = "moderation_logs"
        indexes = [
            models.Index(fields=["target_type", "target_id"]),
            models.Index(fields=["moderator"]),
            models.Index(fields=["created_at"]),
        ]

    def __str__(self):
        return f"{self.moderator_id} → {self.action} ({self.target_type}:{self.target_id})"