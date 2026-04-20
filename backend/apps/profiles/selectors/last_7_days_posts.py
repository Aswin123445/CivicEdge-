from django.db.models import Count
from django.utils.timezone import now
from datetime import timedelta

from apps.forum.models.forum_post import ForumPost

def get_forum_posts_last_7_days():
    today = now().date()
    start_date = today - timedelta(days=6)

    # Step 1: aggregate posts per day
    qs = (
        ForumPost.objects
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