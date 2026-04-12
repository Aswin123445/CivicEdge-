from rest_framework.generics import ListAPIView

from apps.forum.selectors.citizen.get_active_categories_selector import get_active_categories
from apps.forum.serializers.citizen.category_list_serializer import CategoryListSerializer
from apps.user.permissions.user_permissions import IsCitizen


class ListCategoriesAPIView(ListAPIView):
    serializer_class = CategoryListSerializer
    permission_classes = [IsCitizen]
    def get_queryset(self):
        return get_active_categories()