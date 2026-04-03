from django.utils import timezone

from apps.volunteer_army.models.volunteer_event import VolunteerEvent, EventStatus
from apps.volunteer_army.models.volunteer_membership import MembershipStatus


def list_visible_volunteer_events(*, user, on_status=None, group_id=None):
    
    now = timezone.now()

    events = (
        VolunteerEvent.objects.select_related("group", "created_by")
        .filter(
            status=EventStatus.PUBLISHED,
            group__memberships__user=user,
            group__memberships__status=MembershipStatus.ACTIVE,
            group = group_id
        )
        .distinct()
        .order_by("-start_time")
    )

    if on_status == 'upcoming':
        events = events.filter(start_time__gt=now)

    elif on_status == 'completed':
        events = events.filter(end_time__lt=now)

    elif on_status == 'live':
        events = events.filter(
            start_time__lte=now,
            end_time__gte=now
        )

    return events 