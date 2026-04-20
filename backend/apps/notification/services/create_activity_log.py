from apps.notification.models.activiity_log import ActivityFeed
def create_activity(
    *,
    user,
    entity,
    action,
    message: str,
):
    ActivityFeed.objects.create(
        user=user,
        entity=entity,
        action=action,
        message=message,
    )