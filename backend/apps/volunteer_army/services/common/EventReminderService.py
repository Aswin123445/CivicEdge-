
from apps.notification.services.dispatcher import NotificationDispatcher
from apps.notification.utils.event_constants import NotificationEvent


class VolunteerService:

    @staticmethod
    def send_event_reminder(event):

        NotificationDispatcher.dispatch(
            event=NotificationEvent.VOLUNTEER_EVENT_REMINDER,
            payload={
                "event": event
            }
        )