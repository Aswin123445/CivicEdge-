from apps.forum.models import ForumComment

def get_forum_comment(*, comment_id):
    return ForumComment.objects.filter(id=comment_id).first()