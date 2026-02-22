from django.db.models import Q
from apps.issues.models.behavioral_prompt import BehavioralPrompt


def get_behavioral_prompts_for_issue(*, issue):
    """
    Returns active behavioral prompts applicable to the issue.
    Includes global + category-specific prompts.
    """
    return (
        BehavioralPrompt.objects
        .filter(
            is_active=True
        )
        .filter(
            Q(category__isnull=True) | Q(category=issue.category)
        )
        .order_by("display_order")
    )
