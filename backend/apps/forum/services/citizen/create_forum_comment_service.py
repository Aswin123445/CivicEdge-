from rest_framework.exceptions import ValidationError

from apps.forum.models.forum_comment import ForumComment
from apps.forum.selectors.citizen.get_active_forum_post_selector import get_active_forum_post
from apps.forum.selectors.citizen.get_forum_comment_selector import get_forum_comment

def create_forum_comment(*, user, post_id, data):
    post = get_active_forum_post(post_id=post_id)
    if not post:
        raise ValidationError("Post not found or not active")

    parent = None
    parent_id = data.get("parent_id")

    if parent_id:
        parent = get_forum_comment(comment_id=parent_id)

        if not parent:
            raise ValidationError("Parent comment not found")

        if parent.post_id != post.id:
            raise ValidationError("Parent comment must belong to same post")

    comment = ForumComment.objects.create(
        user=user,
        post=post,
        parent=parent,
        content=data["content"],
    )

    return comment