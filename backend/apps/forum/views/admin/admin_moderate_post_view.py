from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from apps.user.permissions.user_permissions import IsAdmin

from apps.forum.serializers.admin.admin_moderate_post_serializer import AdminModeratePostSerializer
from apps.forum.services.admin.admin_moderate_post_service import admin_moderate_post


class AdminModeratePostAPIView(CreateAPIView):
    permission_classes = [ IsAdmin]
    serializer_class = AdminModeratePostSerializer

    def create(self, request, *args, **kwargs):
        post_id = self.kwargs.get("id")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        post = admin_moderate_post(
            moderator=request.user,
            post_id=post_id,
            data=serializer.validated_data,
        )

        return Response({
            "id": post.id,
            "status": post.status,
            "message": "Post moderated successfully",
        })