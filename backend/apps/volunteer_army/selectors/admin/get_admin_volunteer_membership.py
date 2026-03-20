from django.shortcuts import get_object_or_404

from apps.volunteer_army.models.volunteer_membership import VolunteerMembership


def get_admin_volunteer_membership(*, membership_id):
    return get_object_or_404(
        VolunteerMembership.objects
        .select_related("user", "group")
        .prefetch_related("evidences"),
        id=membership_id,
    )