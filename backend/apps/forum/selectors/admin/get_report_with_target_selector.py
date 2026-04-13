from apps.forum.models import ForumReport
from apps.forum.models.forum_post import ForumPost
from apps.forum.models.forum_comment import ForumComment

def get_report_with_target(*, report_id):
    report = ForumReport.objects.select_related("reported_by").filter(id=report_id).first()

    if not report:
        return None, None

    target = None

    if report.target_type == "post":
        target = ForumPost.objects.filter(id=report.target_id).first()

    elif report.target_type == "comment":
        target = ForumComment.objects.filter(id=report.target_id).first()

    return report, target