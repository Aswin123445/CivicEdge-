from apps.volunteer_army.models.volunteer_event import VolunteerEvent


def list_admin_volunteer_events():
    return (
        VolunteerEvent.objects
        .select_related("group", "created_by")
        .order_by("-created_at")
    )