from django.shortcuts import get_object_or_404

from apps.volunteer_army.models.volunteer_event import VolunteerEvent, EventStatus
from apps.volunteer_army.models.volunteer_membership import MembershipStatus


def get_visible_volunteer_event(*, event_id, user):
    return get_object_or_404(
        VolunteerEvent.objects.select_related("group", "created_by").filter(
            id=event_id,
            status=EventStatus.PUBLISHED,
            # end_time__gte=now,
            group__memberships__user=user,
            group__memberships__status=MembershipStatus.ACTIVE,
        ).distinct()
    )