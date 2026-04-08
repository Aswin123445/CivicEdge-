import uuid
from django.db import models
from rest_framework.exceptions import ValidationError

from apps.polls.models.polls import Poll


class PollOption(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    poll = models.ForeignKey(
        Poll,
        on_delete=models.CASCADE,
        related_name="options",
    )

    option_text = models.CharField(max_length=255)

    order = models.PositiveIntegerField()

    class Meta:
        db_table = "poll_options"
        ordering = ["order"]
        constraints = [
            models.UniqueConstraint(
                fields=["poll", "option_text"],
                name="unique_option_per_poll",
            ),
            models.UniqueConstraint(
                fields=["poll", "order"],
                name="unique_option_order_per_poll",
            ),
        ]
        

    def clean(self):
        if not self.option_text or not self.option_text.strip():
            raise ValidationError("Option text cannot be empty")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.option_text} ({self.poll_id}) -> {self.id}"