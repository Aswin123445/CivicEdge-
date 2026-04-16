from apps.forum.models import ForumPost

def get_active_forum_post(*, post_id):
    post = ForumPost.objects.all() 
    return ForumPost.objects.filter(id=post_id, status="active").first()