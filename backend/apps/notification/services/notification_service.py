# apps/notifications/services/notification_service.py

from ..models import Notification


class NotificationService:

    @staticmethod
    def create_notification(**kwargs):
        return Notification.objects.create(**kwargs)

    @staticmethod
    def bulk_create_notifications(notifications):
        return Notification.objects.bulk_create(notifications)