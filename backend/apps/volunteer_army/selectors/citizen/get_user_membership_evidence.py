from django.shortcuts import get_object_or_404

from apps.volunteer_army.models.membership_evidence import MembershipEvidence


def get_user_membership_evidence(*, evidence_id, user):
    return get_object_or_404(
        MembershipEvidence.objects.select_related("membership", "membership__group"),
        id=evidence_id,
        membership__user=user,
    )