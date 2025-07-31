from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import CreateAPIView
from apps.user.serializers.user.user_read_serilazer import UserReadSerializer
from apps.user.serializers.user.user_create import UserCreateSerializer
from rest_framework.permissions import AllowAny
class CitizenRegisterView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = UserCreateSerializer
    def perform_create(self, serializer):
        self.user = serializer.save()

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        return Response({
            "message": "User registered successfully. Please verify your email.",
            "user": UserReadSerializer(self.user).data
        }, status=status.HTTP_201_CREATED) 