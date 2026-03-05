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
    class DecisionContext(models.TextChoices):
        INITIAL_REVIEW = "INITIAL_REVIEW", "Initial Review"
        VERIFICATION_REVIEW = "VERIFICATION_REVIEW", "Verification Review"
        CLOSURE_REVIEW = "CLOSURE_REVIEW", "Closure Review"


    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_id = models.CharField(max_length=20, unique=True, db_index=True, editable=False)    

    issue = models.ForeignKey(
        "Issue",
        on_delete=models.CASCADE,
        related_name="administrative_decisions",
        db_index=True,
    )
    
    decision_type = models.CharField(
        max_length=20,
        choices=DecisionType.choices,
    )

    reason = models.TextField()
    public_message = models.CharField(
        max_length=255,
        blank=True,
        help_text="Citizen-facing explanation of the current review state",
    )

    context = models.CharField(
        max_length=30,
        choices=DecisionContext.choices,
        db_index=True,
        default=DecisionContext.INITIAL_REVIEW
    )

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
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["issue", "context"],
                condition=models.Q(is_active=True),
                name="one_active_decision_per_issue_per_context",
            )
        ]
    
    def save(self, *args, **kwargs):
        if not self.reference_id:
            self.reference_id = generate_reference_id(model=IssueAdministrativeDecision, field_name="reference_id", prefix="IAD", padding=10)
        super().save(*args, **kwargs)
