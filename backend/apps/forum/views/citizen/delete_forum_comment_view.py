from rest_framework.generics import DestroyAPIView
from apps.user.permissions.user_permissions import IsCitizen
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework import status

from apps.forum.selectors.citizen.get_user_forum_comment_selector import get_user_forum_comment
from apps.forum.services.citizen.delete_forum_comment_service import delete_forum_comment   


class DeleteForumCommentAPIView(DestroyAPIView):
    permission_classes = [IsCitizen]
    lookup_field = "id"

    def get_object(self):
        comment = get_user_forum_comment(
            comment_id=self.kwargs.get("id"),
            user=self.request.user,
        )

        if not comment:
            raise NotFound("Comment not found or not owned by user")

        return comment

    def destroy(self, request, *args, **kwargs):
        comment = self.get_object()

        delete_forum_comment(comment=comment)

        return Response(
            {"message": "Comment deleted successfully"},
            status=status.HTTP_204_NO_CONTENT
        )