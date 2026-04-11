
from .handlers import EVENT_HANDLERS


class NotificationDispatcher:

    @staticmethod
    def dispatch(event: str, payload: dict):
        handler = EVENT_HANDLERS.get(event)

        if not handler:
            return

        handler(payload)