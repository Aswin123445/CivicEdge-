import uuid
from django.db import models
from django.conf import settings
from rest_framework.exceptions import ValidationError
from django.utils.timezone import now

from apps.polls.models.poll_option import PollOption
from apps.polls.models.polls import Poll
from shared.utils.generate_reference_id import generate_reference_id


class PollVote(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(max_length=20, unique=True, db_index=True, editable=False)
    poll = models.ForeignKey(
        Poll,
        on_delete=models.CASCADE,
        related_name="votes",
    )

    option = models.ForeignKey(
        PollOption,
        on_delete=models.CASCADE,
        related_name="votes",
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="poll_votes",
    )

    voted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "poll_votes"
        constraints = [
            models.UniqueConstraint(
                fields=["poll", "user"],
                name="unique_user_vote_per_poll",
            )
        ]
        indexes = [
            models.Index(fields=["poll"]),
            models.Index(fields=["user"]),
        ]

    def clean(self):
        # Option must belong to poll
        if self.option.poll_id != self.poll_id:
            raise ValidationError("Selected option does not belong to this poll")

        # Poll must be active
        if self.poll.status != "active":
            raise ValidationError("Poll is not active")

        # Poll must not be expired
        if self.poll.expires_at and self.poll.expires_at < now():
            raise ValidationError("Poll has expired")

    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(model=PollVote, field_name="reference_id", prefix="PVT", padding=10)
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user_id} -> {self.poll_id}"