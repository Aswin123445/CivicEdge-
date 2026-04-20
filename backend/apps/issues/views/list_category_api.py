from rest_framework.generics import CreateAPIView, ListAPIView
from apps.user.permissions.user_permissions import IsAdmin
from apps.issues.serializers.category_serializer import IssueCategoryCreateSerializer, IssueCategoryListSerializer
from apps.issues.selectors.category_selector import get_issue_categories
from apps.issues.services.category_service import create_issue_category
class IssueCategoryListAPIViewNew(ListAPIView):
    serializer_class = IssueCategoryListSerializer
    permission_classes = [IsAdmin]
    search_fields = ["name","description"]

    def get_queryset(self):
        is_active = self.request.query_params.get("is_active")

        if is_active is not None:
            is_active = is_active.lower() == "true"

        return get_issue_categories(is_active=is_active)
    

class IssueCategoryCreateAPIView(CreateAPIView):
    serializer_class = IssueCategoryCreateSerializer
    permission_classes = [IsAdmin]

    def perform_create(self, serializer):
        create_issue_category(data=serializer.validated_data)