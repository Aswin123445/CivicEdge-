from django.utils import timezone
from apps.notification.models.notification import Notification


def mark_notifications_as_read_bulk(*, user, ids):
    """
    Marks notifications as read using hybrid logic.

    Only updates:
    - notifications belonging to the user
    - created after last_seen_at
    - not already read
    """
    state = user.notification_state
    last_seen_at = state.last_seen_at

    queryset = Notification.objects.filter(
        user=user,
        id__in=ids,
        is_read=False,
    )
    # Apply hybrid logic
    if last_seen_at is not None:
        queryset = queryset.filter(created_at__gt=last_seen_at)
    
    updated_count = queryset.update(
        is_read=True,
        read_at=timezone.now()
    )

    return {
        "updated": updated_count,
        "requested": len(ids),
    }