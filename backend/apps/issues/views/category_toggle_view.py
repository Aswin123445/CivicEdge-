from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsAdmin

from apps.issues.models.issue_category import IssueCategory
from apps.forum.services.admin.toggle_category_service import toggle_category


class IssueCategoryToggleAPIView(APIView):
    permission_classes = [IsAdmin]

    def patch(self, request,*args, **kwargs):
        id = kwargs['id']
        try:
            category = IssueCategory.objects.get(id = id)
        except IssueCategory.DoesNotExist:
            return Response(
                {"detail": "Category not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        category = toggle_category(category=category)

        return Response({
            "id": str(category.id),
            "is_active": category.is_active
        })