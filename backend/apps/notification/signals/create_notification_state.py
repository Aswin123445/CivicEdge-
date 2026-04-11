# apps/notifications/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

from apps.notification.models import NotificationState

User = get_user_model()


@receiver(post_save, sender=User)
def create_notification_state(sender, instance, created, **kwargs):
    if created:
        NotificationState.objects.get_or_create(user=instance)