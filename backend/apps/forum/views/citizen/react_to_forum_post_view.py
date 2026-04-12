from rest_framework.generics import CreateAPIView
from apps.user.permissions.user_permissions import IsCitizen
from rest_framework.response import Response

from apps.forum.serializers.citizen.react_to_forum_post_serializer import ReactToForumPostSerializer
from apps.forum.services.citizen.react_to_forum_post_service import react_to_forum_post


class ReactToForumPostAPIView(CreateAPIView):
    permission_classes = [IsCitizen]
    serializer_class = ReactToForumPostSerializer

    def create(self, request, *args, **kwargs):
        post_id = self.kwargs.get("post_id")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        result = react_to_forum_post(
            user=request.user,
            post_id=post_id,
            reaction_type=serializer.validated_data["reaction_type"],
        )

        return Response(result)