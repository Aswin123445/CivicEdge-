from django.db import transaction
from apps.volunteer_army.models import MembershipEvidence
from apps.notification.services.dispatcher import NotificationDispatcher
from apps.notification.utils.event_constants import NotificationEvent


def reject_volunteer_membership(*, membership, by, reason):
    with transaction.atomic():
        
        membership.reject(by=by, reason=reason)
        membership.save()
        NotificationDispatcher.dispatch(
            event=NotificationEvent.VOLUNTEER_JOIN_REJECTED,
            payload={
                "membership": membership,
                "actor": by
            }
        )
        MembershipEvidence.objects.filter(
            membership=membership,
            is_active=True
        ).update(is_active=False)

    return membership