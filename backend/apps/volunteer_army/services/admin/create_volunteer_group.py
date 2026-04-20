from apps.volunteer_army.models.volunteer_group import VolunteerGroup, VolunteerGroupStatus
from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity


def create_volunteer_group(*, data, created_by):
    """
    Creates a volunteer group in DRAFT state.
    """

    group = VolunteerGroup.objects.create(
        **data,
        status=VolunteerGroupStatus.DRAFT,
        created_by=created_by,
    )
    create_activity(
        user=created_by,
        entity=ActivityEntity.EVENT,
        action=ActivityAction.CLOSED,
        message=f"You have created the group {group.name}",
    )

    return group