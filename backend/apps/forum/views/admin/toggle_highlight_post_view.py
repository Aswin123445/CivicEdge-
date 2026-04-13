from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.user.permissions.user_permissions import IsAdmin

from apps.forum.services.admin.toggle_highlight_post_service import toggle_highlight_post

class ToggleHighlightPostAPIView(UpdateAPIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def update(self, request, *args, **kwargs):
        post_id = self.kwargs.get("id")

        post = toggle_highlight_post(
            moderator=request.user,
            post_id=post_id,
        )

        return Response({
            "id": post.id,
            "is_highlighted": post.is_highlighted,
            "message": "Highlight status updated successfully",
        })