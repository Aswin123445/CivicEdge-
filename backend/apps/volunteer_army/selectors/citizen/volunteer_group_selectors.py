
from django.shortcuts import get_object_or_404

from apps.volunteer_army.models.volunteer_group import VolunteerGroup, VolunteerGroupStatus
from apps.volunteer_army.models.volunteer_membership import VolunteerMembership


def list_active_volunteer_groups():
    """
    Returns all active volunteer groups visible to citizens.
    """

    return (
        VolunteerGroup.objects
        .filter(status=VolunteerGroupStatus.ACTIVE, is_active=True)
        .order_by("created_at")
    )
    
def my_list_active_volunteer_memberships(user):
    """
    Returns all active volunteer groups visible to citizens.
    """

    return (
        VolunteerMembership.objects
        .filter(user = user)
        .order_by("created_at")
    )
    
    
def get_active_volunteer_group(group_id):
    """
    Returns a single active volunteer group visible to citizens.
    """

    return get_object_or_404(
        VolunteerGroup,
        id=group_id,
        status=VolunteerGroupStatus.ACTIVE,
        is_active=True,
    )