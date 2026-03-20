from rest_framework.exceptions import ValidationError

from apps.volunteer_army.models.volunteer_event import EventStatus


def update_volunteer_event(*, event, data, by):
    if not by.is_staff:
        raise ValidationError("Only admin can update events.")

    runtime_status = event.get_runtime_status()

    if event.status == EventStatus.CANCELLED:
        raise ValidationError("Cancelled events cannot be updated.")

    if runtime_status in {"LIVE", "COMPLETED"}:
        raise ValidationError("Live or completed events cannot be updated.")

    editable_fields = [
        "title",
        "description",
        "location_name",
        "location_address",
        "start_time",
        "end_time",
        "capacity",
        "sponsor_name",
        "sponsor_website",
        "sponsor_logo_url",
        "sponsor_message",
    ]

    for field in editable_fields:
        if field in data:
            setattr(event, field, data[field])

    event.save()
    return event