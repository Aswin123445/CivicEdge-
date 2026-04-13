from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response

from apps.user.permissions.user_permissions import IsAdmin

from apps.forum.services.admin.toggle_category_service import toggle_category

class ToggleCategoryAPIView(UpdateAPIView):
    permission_classes = [IsAdmin]

    def update(self, request, *args, **kwargs):
        category_id = self.kwargs.get("id")

        category = toggle_category(category_id=category_id)

        return Response({
            "id": category.id,
            "name": category.name,
            "is_active": category.is_active,
            "message": "Category status updated successfully",
        })