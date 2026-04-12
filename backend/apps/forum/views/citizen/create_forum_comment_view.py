from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsCitizen
from apps.forum.serializers.citizen.create_forum_comment_serializer import CreateForumCommentSerializer
from apps.forum.serializers.citizen.forum_comment_response_serializer import ForumCommentResponseSerializer
from apps.forum.services.citizen.create_forum_comment_service import create_forum_comment


class CreateForumCommentAPIView(CreateAPIView):
    permission_classes = [IsCitizen]
    serializer_class = CreateForumCommentSerializer
    permission_classes = [IsCitizen]

    def create(self, request, *args, **kwargs):
        post_id = kwargs.get("post_id")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        comment = create_forum_comment(
            user=request.user,
            post_id=post_id,
            data=serializer.validated_data,
        )

        response_serializer = ForumCommentResponseSerializer(comment)

        return Response(response_serializer.data, status=status.HTTP_201_CREATED)