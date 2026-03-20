from rest_framework.exceptions import ValidationError

from apps.volunteer_army.models.volunteer_membership import MembershipStatus


def delete_membership_evidence(*, evidence):
    membership = evidence.membership

    if membership.status != MembershipStatus.PENDING:
        raise ValidationError("Evidence can only be deleted while membership is pending.")

    evidence.delete()