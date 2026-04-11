from django.db.models import Q
from apps.notification.models.notification import Notification


def get_unread_notification_count(*, user, last_seen_at):
    """
    Returns unread notification count based on hybrid logic.

    Rules:
    - If last_seen_at is None:
        unread = is_read = False
    - Else:
        unread = created_at > last_seen_at AND is_read = False
    """

    base_queryset = Notification.objects.filter(user=user)

    if last_seen_at is None:
        return base_queryset.filter(is_read=False).count()

    return base_queryset.filter(
        Q(created_at__gt=last_seen_at) & Q(is_read=False)
    ).count()