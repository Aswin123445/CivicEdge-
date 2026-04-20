from django.db.models import Count
from django.utils.timezone import now
from datetime import timedelta
from apps.issues.models.issues import Issue

def get_last_7_days_issues():
    today = now().date()
    start_date = today - timedelta(days=6)

    qs = (
        Issue.objects
        .filter(created_at__date__gte=start_date,is_draft=False,is_active=True)
        .values("created_at__date")
        .annotate(count=Count("id"))
    )

    # fill missing days
    data_map = {item["created_at__date"]: item["count"] for item in qs}

    result = []
    for i in range(7):
        day = start_date + timedelta(days=i)
        result.append({
            "date": str(day),
            "count": data_map.get(day, 0)
        })

    return result