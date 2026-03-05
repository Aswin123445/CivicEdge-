import uuid
from django.db import models
from django.contrib.auth import get_user_model
from shared.utils.generate_reference_id import generate_reference_id
User = get_user_model()

class IssueStatusHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(max_length=20, unique=True, db_index=True, editable=False)
    issue = models.ForeignKey(
        "Issue",
        on_delete=models.CASCADE,
        related_name="status_history",
    )

    from_status = models.CharField(max_length=20)
    to_status = models.CharField(max_length=20)

    changed_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        help_text="User who triggered the status change",
    )

    reason = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def save(self, *args, **kwargs):
        if self._state.adding is False:
            raise RuntimeError("IssueStatusHistory records are immutable.")
    
        if not self.reference_id:
            self.reference_id = generate_reference_id(
                model=IssueStatusHistory,
                field_name="reference_id",
                prefix="ISH",
                padding=10
            )
    
        super().save(*args, **kwargs)
