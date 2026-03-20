from rest_framework.exceptions import ValidationError

from apps.volunteer_army.models.volunteer_group import MembershipType
from apps.volunteer_army.models.volunteer_membership import MembershipStatus, VolunteerMembership



def join_volunteer_group(*, user, group):

    # Prevent duplicate memberships
    if VolunteerMembership.objects.filter(user=user, group=group).exists():
        raise ValidationError("You are already a member of this group.")

    # Determine initial status
    if group.membership_type == MembershipType.OPEN:
        status = MembershipStatus.ACTIVE
    else:
        status = MembershipStatus.PENDING

    membership = VolunteerMembership.objects.create(
        user=user,
        group=group,
        status=status,
    )

    return membership