from apps.forum.models import ForumPost

def get_forum_post(*, post_id):
    return ForumPost.objects.filter(id=post_id).first()