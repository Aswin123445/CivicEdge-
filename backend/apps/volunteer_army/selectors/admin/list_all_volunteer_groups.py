from apps.volunteer_army.models.volunteer_group import VolunteerGroup


def list_all_volunteer_groups():
    """
    Admin view: returns all groups (no status filter)
    """

    return VolunteerGroup.objects.all().order_by("-created_at")