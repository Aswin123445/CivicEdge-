from apps.issues.models.behavioral_prompt import BehavioralPrompt
def get_behavioral_prompts(*, is_active=None, category_id=None):
    queryset = BehavioralPrompt.objects.all()

    if is_active is not None:
        queryset = queryset.filter(is_active=is_active)

    if category_id:
        queryset = queryset.filter(category_id=category_id)

    return queryset.order_by("display_order")