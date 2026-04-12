from rest_framework.generics import UpdateAPIView
from apps.user.permissions.user_permissions import IsCitizen
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from apps.forum.serializers.citizen.update_forum_post_serializer import UpdateForumPostSerializer
from apps.forum.selectors.citizen.get_user_forum_post_selector import get_user_forum_post
from apps.forum.serializers.citizen.forum_post_response_serializer import ForumPostResponseSerializer
from apps.forum.services.citizen.update_forum_post_service import update_forum_post
class UpdateForumPostAPIView(UpdateAPIView):
    permission_classes = [IsCitizen]
    serializer_class = UpdateForumPostSerializer
    lookup_field = "id"

    def get_object(self):
        post = get_user_forum_post(
            post_id=self.kwargs.get("id"),
            user=self.request.user,
        )

        if not post:
            raise NotFound("Post not found or not owned by user")

        return post

    def update(self, request, *args, **kwargs):
        post = self.get_object()

        serializer = self.get_serializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        updated_post = update_forum_post(
            post=post,
            data=serializer.validated_data,
        )

        response_serializer = ForumPostResponseSerializer({
            "id": updated_post.id,
            "title": updated_post.title,
            "content": updated_post.content,
            "category": {
                "id": updated_post.category.id,
                "name": updated_post.category.name,
            },
            "media": updated_post.media.all(),
            "created_at": updated_post.created_at,
        })

        return Response(response_serializer.data)