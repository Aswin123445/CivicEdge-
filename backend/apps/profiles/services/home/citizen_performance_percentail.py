from django.db import models

from apps.volunteer_army.models.volunteer_service_log import VolunteerServiceLog
def citizen_performance_percentail(user):
    user_hours_qs = (
        VolunteerServiceLog.objects
        .values("user")
        .annotate(total_hours=models.Sum("service_hours"))
    )
    current_user_hours = user_hours_qs.filter(user=user).values_list("total_hours", flat=True).order_by("-total_hours").first()
    if current_user_hours is None:
        return 100 
    users_below = user_hours_qs.filter(total_hours__lt=current_user_hours).count()
    total_users = user_hours_qs.count() 
    if total_users <= 1 :
        return 1
    percentile = (users_below / total_users) * 100 if total_users > 0 else 0
    top_percentage = 100 - percentile
    return top_percentage