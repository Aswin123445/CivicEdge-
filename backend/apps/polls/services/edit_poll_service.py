from django.db import transaction
from rest_framework.exceptions import ValidationError

from apps.ai.poll_similarity import question_similarity
from apps.polls.models.polls import Status
from django.utils.timezone import now

NEGATIONS = {"not", "no", "don't", "do not", "never"}


def has_negation(text):
    text = text.lower()
    return any(word in text for word in NEGATIONS)


@transaction.atomic
def edit_poll(*, admin_user, poll, data):
    if poll.status == Status.CLOSED or (poll.expires_at and poll.expires_at < now()):
        raise ValidationError("Poll is closed")
    updated_fields = []

    if "question" in data:
        new_question = data["question"]
        old_neg = has_negation(poll.question)
        new_neg = has_negation(new_question)
        if old_neg != new_neg:
            raise ValidationError(
                "Edited question reverses meaning."
            )
        score = question_similarity(poll.question, new_question)

        if score < 0.88:
            raise ValidationError(
                {"question": "Edited question changes original meaning."}
            )

        poll.question = new_question
        updated_fields.append("question")

    if "context" in data:
        poll.context = data["context"]
        updated_fields.append("context")

    if "did_you_know" in data:
        poll.did_you_know = data["did_you_know"]
        updated_fields.append("did_you_know")

    if updated_fields:
        poll.save(update_fields=updated_fields)

    return poll
