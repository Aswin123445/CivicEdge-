# apps/accounts/views/change_password_view.py

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.user.serializers.common.change_password_serializer import ChangePasswordSerializer
from apps.user.services.common.change_password_service import change_user_password




class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data,
            context={"request": request},
        )
        serializer.is_valid(raise_exception=True)

        change_user_password(
            user=request.user,
            new_password=serializer.validated_data["new_password"],
        )

        return Response(
            {"detail": "Password updated successfully."},
            status=status.HTTP_200_OK,
        )