from apps.forum.models import ForumReport

def get_forum_report_detail(*, report_id):
    return (
        ForumReport.objects
        .select_related("reported_by")
        .filter(id=report_id)
        .first()
    )