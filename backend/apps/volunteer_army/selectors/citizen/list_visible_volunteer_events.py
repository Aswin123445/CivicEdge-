from apps.volunteer_army.models.volunteer_event import VolunteerEvent, EventStatus
from apps.volunteer_army.models.volunteer_membership import MembershipStatus


def list_visible_volunteer_events(*, user):
    return (
        VolunteerEvent.objects.select_related("group", "created_by")
        .filter(
            status=EventStatus.PUBLISHED,
            group__memberships__user=user,
            group__memberships__status=MembershipStatus.ACTIVE,
        )
        .distinct()
        .order_by("start_time")
    )