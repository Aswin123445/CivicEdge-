import uuid
from django.db import models

from shared.utils.generate_reference_id import generate_reference_id


class ForumCategory(models.Model):
    """
    Represents a civic domain (e.g., Roads, Waste Management).
    Used to classify forum posts.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(max_length=20, unique=True, db_index=True, editable=False)

    name = models.CharField(max_length=100, unique=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=ForumCategory,
                field_name="reference_id",
                prefix="CAT",
                padding=10,
            )
        super().save(*args, **kwargs)
    class Meta:
        db_table = "forum_categories"
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} -> {self.pk}"