import uuid
from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError

from shared.utils.generate_reference_id import generate_reference_id


class CommentStatus(models.TextChoices):
    ACTIVE = "active", "Active"
    HIDDEN = "hidden", "Hidden"
    REMOVED = "removed", "Removed"


class ForumComment(models.Model):
    """
    Represents a comment on a forum post.
    Supports future threaded replies.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(max_length=20, unique=True, db_index=True, editable=False)

    post = models.ForeignKey(
        "ForumPost",
        on_delete=models.CASCADE,
        related_name="comments",
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="forum_comments",
    )

    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="replies",
    )

    content = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=CommentStatus.choices,
        default=CommentStatus.ACTIVE,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        if self.parent and self.parent.post_id != self.post_id:
            raise ValidationError("Parent comment must belong to same post")
    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=ForumComment,
                field_name="reference_id",
                prefix="FR  C",
                padding=10,
            )
        super().save(*args, **kwargs)
    def change_status(self, new_status: str):
        allowed_transitions = {
            CommentStatus.ACTIVE: {CommentStatus.HIDDEN, CommentStatus.REMOVED},
            CommentStatus.HIDDEN: {CommentStatus.ACTIVE, CommentStatus.REMOVED},
            CommentStatus.REMOVED: set(),
        }

        if new_status not in dict(CommentStatus.choices):
            raise ValidationError("Invalid status")

        if new_status not in allowed_transitions[self.status]:
            raise ValidationError(
                f"Invalid transition from {self.status} to {new_status}"
            )

        self.status = new_status
        self.save(update_fields=["status", "updated_at"])
    class Meta:
        db_table = "forum_comments"
        ordering = ["created_at"]
        indexes = [
            models.Index(fields=["post"]),
            models.Index(fields=["created_at"]),
            models.Index(fields=["status"]),
        ]

    def __str__(self):
        return f"Comment by {self.user_id} on {self.post_id}"