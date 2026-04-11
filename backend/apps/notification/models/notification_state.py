# apps/notifications/models.py

from django.db import models
from apps.user.models.user import User

class NotificationState(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="notification_state"
    )

    last_seen_at = models.DateTimeField(null=True, blank=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"NotificationState → {self.user_id}"