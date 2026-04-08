from django.db import transaction

from apps.polls.models import Poll, PollOption
from apps.polls.models.polls import Status


@transaction.atomic
def create_poll(*, admin_user, data):
    poll = Poll.objects.create(
        image_url=data.get("image_url", ""),
        question=data["question"],
        context=data["context"],
        did_you_know=data.get("did_you_know", ""),
        expires_at=data["expires_at"],
        status=Status.ACTIVE,
        created_by=admin_user,
    )

    options = data["options"]

    option_objs = [
        PollOption(
            poll=poll,
            option_text=opt["text"],
            order=index + 1
        )
        for index, opt in enumerate(options)
    ]
    PollOption.objects.bulk_create(option_objs)

    return poll