from rest_framework.generics import DestroyAPIView
from apps.user.permissions.user_permissions import IsCitizen
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework import status

from apps.forum.selectors.citizen.get_user_forum_post_selector import get_user_forum_post
from apps.forum.services.citizen.delete_forum_post_service import delete_forum_post


class DeleteForumPostAPIView(DestroyAPIView):
    permission_classes = [IsCitizen]
    lookup_field = "id"

    def get_object(self):
        post = get_user_forum_post(
            post_id=self.kwargs.get("id"),
            user=self.request.user,
        )

        if not post:
            raise NotFound("Post not found or not owned by user")

        return post

    def destroy(self, request, *args, **kwargs):
        post = self.get_object()

        delete_forum_post(post=post)

        return Response(
            {"message": "Post deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )