from django.db import transaction
from apps.volunteer_army.models import MembershipEvidence
from apps.notification.services.dispatcher import NotificationDispatcher
from apps.notification.utils.event_constants import NotificationEvent
from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity


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
        create_activity(
            user=by,
            entity=ActivityEntity.GROUP,
            action=ActivityAction.CLOSED,
            message=f"You have rejected the membership of {membership.user.profile.name if membership.user.profile.name else membership.user.email.split('@')[0]} for the group {membership.group.name}",
        )
    return membership