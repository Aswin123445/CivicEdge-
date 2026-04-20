from django.db import models
import uuid
from django.contrib.auth import get_user_model
from shared.utils.generate_reference_id import generate_reference_id

User = get_user_model()
class BehavioralPrompt(models.Model):
    class ResponseType(models.TextChoices):
        YES_NO = "YES_NO"
        MULTIPLE_CHOICE = "MULTIPLE_CHOICE"
        SCALE = "SCALE"
        TEXT = "TEXT"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    reference_id = models.CharField(max_length=20, unique=True, db_index=True, editable=False)

    question_text = models.TextField()

    response_type = models.CharField(
        max_length=20,
        choices=ResponseType.choices,
    )

    options = models.JSONField(
        blank=True,
        null=True,
        help_text="Used for multiple-choice or scale options",
    )

    #  THIS is the v1 decision
    category = models.ForeignKey(
        "IssueCategory",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        help_text="Null = global prompt, else category-specific",
    )

    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(model=BehavioralPrompt, field_name="reference_id", prefix="BPR", padding=10)
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.category if self.category else "Global"} for {self.question_text}'

class IssueBehavioralResponse(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(max_length=20, unique=True, db_index=True, editable=False)
    issue = models.ForeignKey(
        "Issue",
        on_delete=models.CASCADE,
        related_name="behavioral_responses",
    )

    prompt = models.ForeignKey(
        "BehavioralPrompt",
        on_delete=models.PROTECT,
    )

    responded_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
    )

    response_value = models.TextField()
    optional_text = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(model=IssueBehavioralResponse, field_name="reference_id", prefix="IBR", padding=10)
        super().save(*args, **kwargs)

    class Meta:
        unique_together = ("issue", "prompt")
