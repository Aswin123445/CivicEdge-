import uuid
from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError

from shared.utils.generate_reference_id import generate_reference_id


class PostStatus(models.TextChoices):
    ACTIVE = "active", "Active"
    HIDDEN = "hidden", "Hidden"
    REMOVED = "removed", "Removed"


class ForumPost(models.Model):
    """
    Represents a civic idea/opinion/suggestion posted by a user.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(max_length=20, unique=True, db_index=True, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="forum_posts",
    )

    category = models.ForeignKey(
        "ForumCategory",
        on_delete=models.PROTECT,
        related_name="posts",
    )

    title = models.CharField(max_length=255)
    content = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=PostStatus.choices,
        default=PostStatus.ACTIVE,
    )

    is_highlighted = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def change_status(self, new_status: str):
        allowed_transitions = {
            PostStatus.ACTIVE: {PostStatus.HIDDEN, PostStatus.REMOVED},
            PostStatus.HIDDEN: {PostStatus.ACTIVE, PostStatus.REMOVED},
            PostStatus.REMOVED: set(),  # terminal state
        }

        if new_status not in dict(PostStatus.choices):
            raise ValidationError("Invalid status")

        if new_status not in allowed_transitions[self.status]:
            raise ValidationError(
                f"Invalid transition from {self.status} to {new_status}"
            )

        self.status = new_status
        self.save(update_fields=["status", "updated_at"])
    def highlight(self):
        self.is_highlighted = True
        self.save(update_fields=["is_highlighted"])

    def unhighlight(self):
        self.is_highlighted = False
        self.save(update_fields=["is_highlighted"])
        
    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=ForumPost,
                field_name="reference_id",
                prefix="FR  P",
                padding=10,
            )
        super().save(*args, **kwargs)
    class Meta:
        db_table = "forum_posts"
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["created_at"]),
            models.Index(fields=["category"]),
            models.Index(fields=["status"]),
        ]

    def __str__(self):
        return f"{self.title} ({self.status}) id {self.id}"