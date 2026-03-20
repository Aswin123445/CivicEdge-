from rest_framework.exceptions import ValidationError


def upload_membership_evidence(*, membership, file_url, description):

    # Rule 1: Only for approval-required groups
    if membership.group.membership_type != "APPROVAL_REQUIRED":
        raise ValidationError("This group does not require evidence.")

    # Rule 2: Only PENDING memberships
    if membership.status != "PENDING":
        raise ValidationError("Cannot upload evidence for this membership.")

    evidence = membership.evidences.create(
        file_url=file_url,
        description=description,
    )

    return evidence