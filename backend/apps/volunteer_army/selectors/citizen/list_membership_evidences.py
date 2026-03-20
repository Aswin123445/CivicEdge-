from apps.volunteer_army.models.membership_evidence import MembershipEvidence


def list_membership_evidences(*, membership):
    """
    Returns all evidences for a given membership.
    """

    return (
        MembershipEvidence.objects
        .filter(membership=membership)
        .order_by("-uploaded_at")
    )