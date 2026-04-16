from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsAdmin

from apps.forum.serializers.admin.admin_post_list_serializer import AdminPostListSerializer
from apps.forum.selectors.admin.get_admin_posts_selector import get_admin_posts


class AdminListPostsAPIView(ListAPIView):
    permission_classes = [ IsAdmin]
    serializer_class = AdminPostListSerializer
    search_fields = ["title", "status","reference_id","category__name"]
    filterset_fields = ["status"]
    ordering_fields = ["created_at"]
    ordering = ["-created_at"]

    def get_queryset(self):
        status = self.request.query_params.get("status")
        category_id = self.request.query_params.get("category")
        user_id = self.request.query_params.get("user")

        return get_admin_posts(
            status=status,
            category_id=category_id,
            user_id=user_id,
        )