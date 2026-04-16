from apps.forum.models import ForumReport

def get_forum_reports(*, status=None, target_type=None):
    qs = ForumReport.objects.select_related("reported_by")

    if status:
        qs = qs.filter(action=status)

    if target_type:
        qs = qs.filter(action=target_type)

    return qs.order_by("-created_at")