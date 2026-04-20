from apps.notification.models.activiity_log import ActivityFeed
from django.db.models import Count


def get_user_activity(*, user):
    queryset = ActivityFeed.objects.filter(user=user)

    return queryset



def get_activity_analytics(queryset):
    # Most active entity
    most_active_entity = (
        queryset.values("entity")
        .annotate(count=Count("id"))
        .order_by("-count")
        .first()
    )

    # Most active action
    most_active_action = (
        queryset.values("action")
        .annotate(count=Count("id"))
        .order_by("-count")
        .first()
    )

    # Count per entity
    entity_counts = (
        queryset.values("entity")
        .annotate(count=Count("id"))
        .order_by("-count")
    )

    return {
        "most_active_entity": most_active_entity,
        "most_active_action": most_active_action,
        "entity_counts": list(entity_counts),
    }
