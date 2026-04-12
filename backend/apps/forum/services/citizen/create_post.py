from django.db import transaction

from apps.forum.models.forum_post import ForumPost
from apps.forum.models.forum_post_media import ForumPostMedia
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
                reference_id = generate_reference_id(model=ForumPostMedia, field_name="reference_id", prefix="FPM", padding=10),
            )
            for index, image in enumerate(images)
        ]

        ForumPostMedia.objects.bulk_create(media_objects)

    return post