from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from apps.notification.selectors.get_unread_notification_count import get_unread_notification_count


class RealtimeNotificationService:

    @staticmethod
    def _channel():
        return get_channel_layer()

    @staticmethod
    def push_event_user(*, user_id, event, data):
        channel_layer = RealtimeNotificationService._channel()

        async_to_sync(channel_layer.group_send)(
            f"user_{user_id}",
            {
                "type": "ws_notify",
                "event": event,
                "data": data,
            },
        )

    @staticmethod
    def push_event_group(*, group_name, event, data):
        channel_layer = RealtimeNotificationService._channel()

        async_to_sync(channel_layer.group_send)(
            group_name,
            {
                "type": "ws_notify",
                "event": event,
                "data": data,
            },
        )

    @staticmethod
    def push_unread_count(*, user):
        count = get_unread_notification_count(
            user=user, last_seen_at=user.notification_state.last_seen_at
        )

        RealtimeNotificationService.push_event_user(
            user_id=user.id, event="notification.unread_count", data={"count": count}
        )

    @staticmethod
    def push_unread_count_many(users):
        for user in users:
            RealtimeNotificationService.push_unread_count(user=user)

    @staticmethod
    def push_unread_count_group(group_name):
        RealtimeNotificationService.push_event_group(
            group_name=group_name, event="notification.refresh_count", data={}
        )
