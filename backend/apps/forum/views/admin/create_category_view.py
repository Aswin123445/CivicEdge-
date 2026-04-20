from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status

from apps.user.permissions.user_permissions import IsAdmin

from apps.forum.serializers.admin.create_category_serializer import CreateCategorySerializer
from apps.forum.services.admin.create_category_service import create_category


class CreateCategoryAPIView(CreateAPIView):
    permission_classes = [IsAdmin]
    serializer_class = CreateCategorySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        category = create_category(
            data=serializer.validated_data,
            by = request.user
        )

        return Response(
            {
                "id": category.id,
                "name": category.name,
                "is_active": category.is_active,
                "message": "Category created successfully",
            },
            status=status.HTTP_201_CREATED,
        )