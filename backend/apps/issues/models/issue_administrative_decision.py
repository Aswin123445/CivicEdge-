from django.db import models 
from django.contrib.auth import get_user_model
import uuid
User = get_user_model()
from shared.utils.generate_reference_id import generate_reference_id
class IssueAdministrativeDecision(models.Model):
    class DecisionType(models.TextChoices):
        APPROVED = "APPROVED", "Approved"
        POSTPONED = "POSTPONED", "Postponed"
        BLOCKED = "BLOCKED", "Blocked"
        ESCALATED = "ESCALATED", "Escalated"


    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(max_length=20, unique=True, db_index=True, editable=False)    

    issue = models.ForeignKey(
        "Issue",
        on_delete=models.CASCADE,
        related_name="administrative_decisions",
    )
    
    decision_type = models.CharField(
        max_length=20,
        choices=DecisionType.choices,
    )

    reason = models.TextField()

    decided_by = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
    )

    expected_review_date = models.DateField(
        null=True,
        blank=True,
        help_text="When this issue will be revisited",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)
    
    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(model=IssueAdministrativeDecision, field_name="reference_id", prefix="IAD", padding=10)
        super().save(*args, **kwargs)
