from rest_framework.generics import ListAPIView

from apps.user.permissions.user_permissions import IsAdmin

from apps.forum.selectors.admin.get_all_categories_selector import get_all_categories
from apps.forum.serializers.admin.admin_category_list_serializer import AdminCategoryListSerializer


class AdminListCategoriesAPIView(ListAPIView):
    permission_classes = [ IsAdmin]
    serializer_class = AdminCategoryListSerializer
    search_fields = ["name","reference_id","is_active"]

    def get_queryset(self):
        return get_all_categories()