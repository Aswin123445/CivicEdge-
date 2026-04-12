from apps.forum.models.forum_reaction import ForumReaction

def get_user_post_reaction(*, user, post_id):
    reaction = (
        ForumReaction.objects
        .filter(user=user, post_id=post_id)
        .first()
    )
    return reaction.reaction_type if reaction else None