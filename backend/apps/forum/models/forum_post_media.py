import uuid
from django.db import models

from shared.utils.generate_reference_id import generate_reference_id


class ForumPostMedia(models.Model):
    """
    Stores media (images) attached to a forum post.
    Uses Cloudinary for storage.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(max_length=20, unique=True, db_index=True, editable=False)
    post = models.ForeignKey(
        "ForumPost",
        on_delete=models.CASCADE,
        related_name="media",
    )

    # Cloudinary fields
    public_id = models.CharField(max_length=255, unique=True)
    url = models.URLField(max_length=500)

    # Optional metadata (useful later)
    width = models.PositiveIntegerField(null=True, blank=True)
    height = models.PositiveIntegerField(null=True, blank=True)
    format = models.CharField(max_length=20, null=True, blank=True)

    order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=ForumPostMedia,
                field_name="reference_id",
                prefix="FPM",
                padding=10,
            )
        super().save(*args, **kwargs)
    class Meta:
        db_table = "forum_post_media"
        ordering = ["order", "created_at"]
        indexes = [
            models.Index(fields=["post"]),
            models.Index(fields=["public_id"]),
        ]

    def __str__(self):
        return f"Media for post {self.post_id}"