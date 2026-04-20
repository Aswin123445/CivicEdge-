from rest_framework.generics import UpdateAPIView
from apps.user.permissions.user_permissions import IsAdmin
from apps.issues.models.issue_category import IssueCategory
from apps.issues.serializers.category_serializer import IssueCategoryUpdateSerializer


class IssueCategoryUpdateAPIView(UpdateAPIView):
    queryset = IssueCategory.objects.all()
    serializer_class = IssueCategoryUpdateSerializer
    permission_classes = [IsAdmin]