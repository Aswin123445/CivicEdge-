from apps.forum.models import ForumPost

def get_active_forum_post(*, post_id):
    post = ForumPost.objects.all() 
    print(post_id)
    for p in post:
        print(p.id,p.status)
    return ForumPost.objects.filter(id=post_id, status="active").first()