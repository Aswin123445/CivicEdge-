from django.db import transaction
from rest_framework.exceptions import ValidationError
from apps.issues.models.behavioral_prompt import BehavioralPrompt
from apps.issues.models.behavioral_prompt import IssueBehavioralResponse
from apps.issues.selectors.get_behavioral_prompts_for_issue import get_behavioral_prompts_for_issue
from rest_framework.exceptions import PermissionDenied
from apps.issues.models.issues import Issue
@transaction.atomic
def submit_issue_behavior(*, issue, user, responses):
    
    if issue.draft_step != Issue.DraftStep.EVIDENCE:
        raise PermissionDenied("Not allowed to perform this action.")
    # Fetch applicable prompts
    prompts = list(get_behavioral_prompts_for_issue(issue = issue))
    prompts_by_id = {p.id: p for p in prompts}

    # Validate each response against its prompt
    for item in responses:
        prompt = prompts_by_id.get(item["prompt_id"])
        if not prompt:
            raise ValidationError("Invalid prompt for this issue.")

        val = item["response_value"]

        if prompt.response_type == BehavioralPrompt.ResponseType.YES_NO:
            if val not in ("YES", "NO"):
                raise ValidationError("YES_NO expects YES or NO.")

        elif prompt.response_type == BehavioralPrompt.ResponseType.MULTIPLE_CHOICE:
            prompt_key = [p['key'] for p in prompt.options]
            if not prompt.options or val not in prompt_key:
                raise ValidationError("Invalid option selected.")

        elif prompt.response_type == BehavioralPrompt.ResponseType.SCALE:
            if not prompt.options or val not in map(str, prompt.options):
                raise ValidationError("Invalid scale value.")

        elif prompt.response_type == BehavioralPrompt.ResponseType.TEXT:
            if not val.strip():
                raise ValidationError("Text response cannot be empty.")

        IssueBehavioralResponse.objects.update_or_create(
            issue=issue,
            prompt=prompt,
            defaults={
                "responded_by": user,
                "response_value": val,
                "optional_text": item.get("optional_text", ""),
            },
        )

    # Completion check: all prompts answered?
    answered_ids = set(
        issue.behavioral_responses.values_list("prompt_id", flat=True)
    )
    if set(prompts_by_id.keys()).issubset(answered_ids):
        issue.draft_step = issue.DraftStep.BEHAVIOR
        issue.save(update_fields=["draft_step"])
