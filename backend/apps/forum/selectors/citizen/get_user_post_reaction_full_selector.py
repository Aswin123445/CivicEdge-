from apps.forum.models import ForumReaction

def get_user_post_reaction(*, user, post_id):
    return (
        ForumReaction.objects
        .filter(user=user, post_id=post_id)
        .first()
    )