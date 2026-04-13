from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.user.permissions.user_permissions import IsAdmin

from apps.forum.serializers.admin.admin_moderate_comment_serializer import AdminModerateCommentSerializer
from apps.forum.services.admin.admin_moderate_comment_service import admin_moderate_comment


class AdminModerateCommentAPIView(CreateAPIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    serializer_class = AdminModerateCommentSerializer

    def create(self, request, *args, **kwargs):
        comment_id = self.kwargs.get("id")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        comment = admin_moderate_comment(
            moderator=request.user,
            comment_id=comment_id,
            data=serializer.validated_data,
        )

        return Response({
            "id": comment.id,
            "status": comment.status,
            "message": "Comment moderated successfully",
        })