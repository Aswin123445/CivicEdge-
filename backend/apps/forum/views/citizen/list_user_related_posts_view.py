from rest_framework.generics import ListAPIView

from apps.forum.selectors.citizen.get_user_related_posts_selector import get_user_related_posts
from apps.forum.serializers.citizen.forum_post_list_serializer import ForumPostListSerializer
from apps.user.permissions.user_permissions import IsCitizen



class ListUserRelatedPostsAPIView(ListAPIView):
    permission_classes = [IsCitizen]
    serializer_class = ForumPostListSerializer
    search_fields = [
        "reference_id",
        "title",
    ]
    filterset_fields = [
        "status",
    ]
    ordering_fields = [
        "created_at",
    ]
    def get_queryset(self):
        user_id = self.request.user.id
        return get_user_related_posts(user_id=user_id)