from django.shortcuts import get_object_or_404
from apps.polls.models import Poll


def get_poll_by_id(poll_id):
    return get_object_or_404(Poll, id=poll_id)
