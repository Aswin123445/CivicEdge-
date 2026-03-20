
from apps.volunteer_army.models.volunteer_group import VolunteerGroupStatus
from rest_framework.exceptions import ValidationError


def update_volunteer_group(*, group, data):

    # Prevent updates if archived
    if group.status == VolunteerGroupStatus.ARCHIVED:
        raise ValidationError("Cannot update archived group.")

    # Update fields
    for field, value in data.items():
        setattr(group, field, value)

    group.save()

    return group