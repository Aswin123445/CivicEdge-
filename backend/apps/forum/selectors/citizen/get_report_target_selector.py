from apps.forum.models.forum_post import ForumPost 
from apps.forum.models.forum_comment import ForumComment
def get_report_target(*, target_type, target_id):
    if target_type == "post":
        return ForumPost.objects.filter(id=target_id).first()

    if target_type == "comment":
        return ForumComment.objects.filter(id=target_id).first()

    return None