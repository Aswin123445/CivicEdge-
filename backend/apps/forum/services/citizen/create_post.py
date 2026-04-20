from django.db import transaction

from apps.forum.models.forum_post import ForumPost
from apps.forum.models.forum_post_media import ForumPostMedia
from apps.notification.models.activiity_log import ActivityAction, ActivityEntity
from apps.notification.services.create_activity_log import create_activity
from shared.utils.generate_reference_id import generate_reference_id


@transaction.atomic
def create_post(*, user, data):
    title = data["title"]
    content = data["content"]
    category_id = data["category_id"]
    images = data.get("images", [])

    post = ForumPost.objects.create(
        user=user,
        title=title,
        content=content,
        category_id=category_id,
    )

    if images:
        media_objects = [
            ForumPostMedia(
                post=post,
                public_id=image["public_id"],
                url=image["url"],
                order=index,
            )
            for index, image in enumerate(images)
        ]

        for media_object in media_objects:
            media_object.reference_id = generate_reference_id(
                model=ForumPostMedia,
                field_name="reference_id",
                prefix="FPM",
                padding=10,
            )
            media_object.save()
    create_activity(
        user=user,
        entity=ActivityEntity.FORUM,
        action=ActivityAction.CREATED,
        message=f"Created a new post: {post.title}",
    )

    return post
