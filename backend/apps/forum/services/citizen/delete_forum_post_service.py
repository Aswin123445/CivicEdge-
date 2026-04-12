from apps.forum.models.forum_post import PostStatus


def delete_forum_post(*, post):
    if post.status == PostStatus.REMOVED:
        return post  

    post.change_status(PostStatus.REMOVED)

    return post