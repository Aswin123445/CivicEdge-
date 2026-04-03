from apps.volunteer_army.models.volunteer_group import VolunteerGroup, VolunteerGroupStatus


def list_all_volunteer_groups():
    """
    Admin view: returns all groups (no status filter)
    """

    return VolunteerGroup.objects.all().order_by("-created_at")
def list_active_volunteer_groups():
    """
    Admin view: returns all active groups
    """

    return VolunteerGroup.objects.filter(status=VolunteerGroupStatus.ACTIVE).order_by("-created_at")