import uuid
from django.db import models
from django.conf import settings

from shared.utils.generate_reference_id import generate_reference_id


class ReactionType(models.TextChoices):
    LIKE = "like", "Like"
    APPRECIATE = "appreciate", "Appreciate"
    IMPORTANT = "important", "Important"


class ForumReaction(models.Model):
    """
    Represents a user's reaction to a forum post.
    One user can have only one reaction per post.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(max_length=20, unique=True, db_index=True, editable=False)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="forum_reactions",
    )

    post = models.ForeignKey(
        "ForumPost",
        on_delete=models.CASCADE,
        related_name="reactions",
    )

    reaction_type = models.CharField(
        max_length=20,
        choices=ReactionType.choices,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=ForumReaction,
                field_name="reference_id",
                prefix="FR  C",
                padding=10,
            )
        super().save(*args, **kwargs)
    class Meta:
        db_table = "forum_reactions"
        unique_together = ("user", "post")  # 🔥 critical constraint
        indexes = [
            models.Index(fields=["post"]),
            models.Index(fields=["user"]),
        ]

    def __str__(self):
        return f"{self.user_id} → {self.post_id} ({self.reaction_type})"