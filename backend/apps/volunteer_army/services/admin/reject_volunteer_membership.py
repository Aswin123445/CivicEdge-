from django.db import transaction
from apps.volunteer_army.models import MembershipEvidence


def reject_volunteer_membership(*, membership, by, reason):
    with transaction.atomic():
        
        membership.reject(by=by, reason=reason)
        membership.save()

        MembershipEvidence.objects.filter(
            membership=membership,
            is_active=True
        ).update(is_active=False)

    return membership