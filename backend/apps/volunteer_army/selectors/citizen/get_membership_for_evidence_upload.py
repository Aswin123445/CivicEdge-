from django.shortcuts import get_object_or_404

from volunteer_army.models.volunteer_membership import VolunteerMembership

def get_membership_for_evidence_upload(*, membership_id, user):

    return get_object_or_404(
        VolunteerMembership,
        id=membership_id,
        user=user,
    )