from django.db.models import Count

from apps.forum.models.forum_reaction import ForumReaction

def get_post_reaction_summary(*, post_id):
    return (
        ForumReaction.objects
        .filter(post_id=post_id)
        .values("reaction_type")
        .annotate(count=Count("id"))
    )