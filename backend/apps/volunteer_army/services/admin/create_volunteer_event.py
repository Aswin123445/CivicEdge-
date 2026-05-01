from rest_framework.exceptions import ValidationError

from apps.volunteer_army.models.volunteer_event import (
    VolunteerEvent,
    EventStatus,
)
from apps.volunteer_army.models.volunteer_group import VolunteerGroupStatus
from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity


def create_volunteer_event(
    *,
    group,
    title,
    description,
    location_name,
    location_address,
    start_time,
    end_time,
    capacity,
    sponsor_name,
    sponsor_website,
    sponsor_logo_url,
    sponsor_message,
    by,
):
    if not by.is_staff:
        raise ValidationError("Only admin can create events.")

    if group.status != VolunteerGroupStatus.ACTIVE:
        raise ValidationError("Events can only be created under active groups.")

    event = VolunteerEvent.objects.create(
        group=group,
        title=title,
        description=description,
        location_name=location_name,
        location_address=location_address,
        start_time=start_time,
        end_time=end_time,
        capacity=capacity,
        sponsor_name=sponsor_name,
        sponsor_website=sponsor_website,
        sponsor_logo_url=sponsor_logo_url,
        sponsor_message=sponsor_message,
        status=EventStatus.DRAFT,
        created_by=by,
    )
    create_activity(
        user=by,
        entity=ActivityEntity.EVENT,
        action=ActivityAction.CREATED,
        message=f"You have created the event {event.title}",
    )

    return event
