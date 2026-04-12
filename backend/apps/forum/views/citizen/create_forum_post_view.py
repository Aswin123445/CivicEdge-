from rest_framework.generics import CreateAPIView
from apps.user.permissions.user_permissions import IsCitizen
from rest_framework.response import Response
from rest_framework import status

from apps.forum.services.citizen.create_post import create_post
from apps.forum.serializers.citizen.create_forum_post_serializer import CreateForumPostSerializer
from apps.forum.serializers.citizen.forum_post_response_serializer import ForumPostResponseSerializer

class CreateForumPostAPIView(CreateAPIView):
    permission_classes = [IsCitizen]
    serializer_class = CreateForumPostSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        post = create_post(
            user=request.user,
            data=serializer.validated_data,   
        )

        response_serializer = ForumPostResponseSerializer({
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "category": {
                "id": post.category.id,
                "name": post.category.name,
            },
            "media": post.media.all(),
            "created_at": post.created_at,
        })

        return Response(response_serializer.data, status=status.HTTP_201_CREATED)