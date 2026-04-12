from rest_framework.exceptions import ValidationError


def update_forum_post(*, post, data):
    if post.status == "removed":
        raise ValidationError("Cannot update a removed post")

    for field in ["title", "content"]:
        if field in data:
            setattr(post, field, data[field])

    post.save()
    return post