from django.shortcuts import get_object_or_404

from apps.volunteer_army.models.volunteer_event import VolunteerEvent


def get_admin_volunteer_event(*, event_id):
    return get_object_or_404(
        VolunteerEvent.objects.select_related("group", "created_by"),
        id=event_id,
    )