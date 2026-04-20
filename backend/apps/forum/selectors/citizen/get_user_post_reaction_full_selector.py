from apps.forum.models import ForumReaction

def get_user_post_reaction(*, user, post_id):
    existing_reaction = (
        ForumReaction.objects
        .filter(user=user, post_id=post_id)
        .first()
    )
    count = ForumReaction.objects.filter(post_id=post_id).count()
    return existing_reaction, count