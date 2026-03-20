from django.db.models import Sum, Count
from apps.volunteer_army.models.volunteer_service_log import VolunteerServiceLog


def list_top_volunteers(*, limit=10):
    return (
        VolunteerServiceLog.objects.filter(is_active=True)
        .values(
            "user",
            "user__email",
        )
        .annotate(
            total_service_hours=Sum("service_hours"),
            total_service_logs=Count("id"),
        )
        .order_by("-total_service_hours", "-total_service_logs")[:limit]
    )