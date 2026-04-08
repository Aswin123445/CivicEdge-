from django.db.models import Count
from apps.polls.models import Poll
from apps.polls.models.polls import Status
from django.utils.timezone import now
from django.db import models

def get_admin_polls(status = None):
    if status == Status.ACTIVE:
        queryset = (
            Poll.objects
            .annotate(total_votes=Count("votes")).filter(status=status,expires_at__gte=now())
            .order_by("-created_at")
        )
    elif status == Status.CLOSED:
        queryset = (
            Poll.objects
            .filter(models.Q(status=status) | models.Q(expires_at__lte=now()))
            .annotate(total_votes=Count("votes"))
            .order_by("-created_at")
        )
    else:
        queryset = (
            Poll.objects
            .annotate(total_votes=Count("votes"))
            .order_by("-created_at")
        )
    return queryset