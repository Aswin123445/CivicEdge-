from apps.issues.models.issue_category import IssueCategory
from apps.issues.serializers.issue_category_serializer import IssueCategorySerializer
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny


class IssueCategoryListAPIView(ListAPIView):
    serializer_class = IssueCategorySerializer
    pagination_class = None
    permission_classes = [AllowAny]

    def get_queryset(self):
        return IssueCategory.objects.filter(is_active=True).order_by("display_order")