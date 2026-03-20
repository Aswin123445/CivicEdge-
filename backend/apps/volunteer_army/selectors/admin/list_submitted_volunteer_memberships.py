from apps.volunteer_army.models.volunteer_membership import (
    VolunteerMembership,
    MembershipStatus,
)


def list_submitted_volunteer_memberships():
    return (
        VolunteerMembership.objects
        .select_related("user", "group")
        .prefetch_related("evidences")
        .filter(status=MembershipStatus.SUBMITTED)
        .order_by("-created_at")
    )