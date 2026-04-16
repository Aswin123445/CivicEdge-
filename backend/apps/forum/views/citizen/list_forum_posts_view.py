from rest_framework.generics import ListAPIView

from apps.forum.selectors.citizen.get_forum_posts_selector import get_forum_posts
from apps.forum.serializers.citizen.forum_post_list_serializer import ForumPostListSerializer
from apps.user.permissions.user_permissions import IsCitizen

class ListForumPostsAPIView(ListAPIView):
    serializer_class = ForumPostListSerializer
    permission_classes = [IsCitizen]
    search_fields = [
        "reference_id",
        "title",
        "category__name",
    ]
    filterset_fields = [
        "category__reference_id",
    ]
    ordering_fields = [
        "created_at",
    ]
    ordering = ["-created_at"] 
    def get_queryset(self):
        category_id = self.request.query_params.get("category")

        return get_forum_posts(category_id=category_id)