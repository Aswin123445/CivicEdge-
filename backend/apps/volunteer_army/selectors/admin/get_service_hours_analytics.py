from django.db.models import Sum, Count, Avg
from apps.volunteer_army.models.volunteer_service_log import VolunteerServiceLog


def get_service_hours_analytics():
    aggregate_data = (
        VolunteerServiceLog.objects.filter(is_active=True)
        .aggregate(
            total_service_hours=Sum("service_hours"),
            total_service_logs=Count("id"),
            unique_volunteers=Count("user", distinct=True),
            unique_events=Count("event", distinct=True),
            average_hours_per_log=Avg("service_hours"),
        )
    )

    return {
        "total_service_hours": aggregate_data["total_service_hours"] or 0,
        "total_service_logs": aggregate_data["total_service_logs"] or 0,
        "unique_volunteers": aggregate_data["unique_volunteers"] or 0,
        "unique_events": aggregate_data["unique_events"] or 0,
        "average_hours_per_log": aggregate_data["average_hours_per_log"] or 0,
    }