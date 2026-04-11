from celery import shared_task
from django.utils import timezone
from datetime import timedelta

from apps.volunteer_army.models.volunteer_event import VolunteerEvent
from apps.volunteer_army.services.common.EventReminderService import VolunteerService


@shared_task
def send_upcoming_event_notifications():
    now = timezone.now()
    next_24_hours = now + timedelta(hours=24)

    events = VolunteerEvent.objects.filter(
        start_time__gte=now,
        start_time__lte=next_24_hours,
        reminder_sent=False
    )

    for event in events:
        VolunteerService.send_event_reminder(event)

        event.reminder_sent = True
        event.save()