
from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity


def activate_volunteer_group(*, group, by):
    group.activate(by=by)
    create_activity(
        user=by,
        entity=ActivityEntity.GROUP,
        action=ActivityAction.MODERATED,
        message=f"You have activated the group {group.name}",
    )
    return group