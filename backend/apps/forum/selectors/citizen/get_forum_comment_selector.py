from apps.forum.models.forum_comment import ForumComment

def get_forum_comment(*, comment_id):
    return ForumComment.objects.filter(id=comment_id, status="active").first()