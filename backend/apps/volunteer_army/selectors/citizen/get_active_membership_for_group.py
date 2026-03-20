from django.shortcuts import get_object_or_404

from apps.volunteer_army.models.volunteer_membership import (
    VolunteerMembership,
    MembershipStatus,
)


def get_active_membership_for_group(*, user, group):
    return get_object_or_404(
        VolunteerMembership,
        user=user,
        group=group,
        status=MembershipStatus.ACTIVE,
    )