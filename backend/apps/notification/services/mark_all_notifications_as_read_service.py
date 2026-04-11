from django.utils import timezone


def mark_all_notifications_as_read(user):
    state = user.notification_state

    state.last_seen_at = timezone.now()
    state.save()

    return state