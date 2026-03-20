from apps.volunteer_army.models.volunteer_membership import VolunteerMembership


def list_user_memberships(user):
    """
    Returns all memberships of a user.
    """

    return (
        VolunteerMembership.objects
        .select_related("group")
        .filter(user=user)
        .order_by("-created_at")
    )