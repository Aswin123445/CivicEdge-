from rest_framework.generics import UpdateAPIView
from apps.user.permissions.user_permissions import IsCitizen
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from apps.forum.serializers.citizen.update_forum_comment_serializer import UpdateForumCommentSerializer
from apps.forum.selectors.citizen.get_user_forum_comment_selector import get_user_forum_comment
from apps.forum.services.citizen.update_forum_comment_service import update_forum_comment
from apps.forum.serializers.citizen.forum_comment_response_serializer import ForumCommentResponseSerializer


class UpdateForumCommentAPIView(UpdateAPIView):
    permission_classes = [IsCitizen]
    serializer_class = UpdateForumCommentSerializer
    lookup_field = "id"

    def get_object(self):
        comment = get_user_forum_comment(
            comment_id=self.kwargs.get("id"),
            user=self.request.user,
        )

        if not comment:
            raise NotFound("Comment not found or not owned by user")

        return comment

    def update(self, request, *args, **kwargs):
        comment = self.get_object()

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        updated_comment = update_forum_comment(
            comment=comment,
            data=serializer.validated_data,
        )

        response_serializer = ForumCommentResponseSerializer(updated_comment)

        return Response(response_serializer.data)