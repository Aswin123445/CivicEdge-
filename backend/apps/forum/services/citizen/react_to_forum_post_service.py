from rest_framework.exceptions import ValidationError

from apps.forum.selectors.citizen.get_active_forum_post_selector import get_active_forum_post
from apps.forum.selectors.citizen.get_user_post_reaction_full_selector import get_user_post_reaction
from apps.forum.models.forum_reaction import ForumReaction
from apps.notification.services.dispatcher import NotificationDispatcher
from apps.notification.utils.event_constants import NotificationEvent


def react_to_forum_post(*, user, post_id, reaction_type):
    post = get_active_forum_post(post_id=post_id)

    if not post:
        raise ValidationError("Post not found or not active")

    existing_reaction, count = get_user_post_reaction(
        user=user,
        post_id=post_id,
    )
    if count in {10,25,50,100,250,500,1000}:
        NotificationDispatcher.dispatch(
            event=NotificationEvent.FORUM_POST_REACTED,
            payload={
                "post": post,
                "actor": user,
            }
        )
    if not existing_reaction:
        ForumReaction.objects.create(
            user=user,
            post=post,
            reaction_type=reaction_type,
        )
        return {"status": "created", "reaction_type": reaction_type}

    if existing_reaction.reaction_type == reaction_type:
        existing_reaction.delete()
        return {"status": "removed", "reaction_type": None}

    existing_reaction.reaction_type = reaction_type
    existing_reaction.save(update_fields=["reaction_type"])

    return {"status": "updated", "reaction_type": reaction_type}