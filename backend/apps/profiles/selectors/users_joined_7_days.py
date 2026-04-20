from django.db.models import Count
from django.utils.timezone import now
from datetime import timedelta
from django.contrib.auth import get_user_model

User = get_user_model()

def get_users_joined_last_7_days():
    today = now().date()
    start_date = today - timedelta(days=6)

    qs = (
        User.objects
        .filter(created_at__date__gte=start_date)
        .values("created_at__date")
        .annotate(count=Count("id"))
        .order_by("created_at__date")
    )

    data_map = {
        item["created_at__date"]: item["count"]
        for item in qs
    }

    result = []
    for i in range(7):
        day = start_date + timedelta(days=i)
        result.append({
            "date": str(day),
            "count": data_map.get(day, 0)
        })

    return result