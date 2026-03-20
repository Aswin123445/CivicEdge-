from django.shortcuts import get_object_or_404
from apps.volunteer_army.models.volunteer_membership import VolunteerMembership


def get_user_membership(*, membership_id, user):
    """
    Returns membership only if it belongs to the user.
    """

    return get_object_or_404(
        VolunteerMembership.objects.select_related("group"),
        id=membership_id,
        user=user, 
    )