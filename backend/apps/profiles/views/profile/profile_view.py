from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateAPIView

from apps.profiles.serializers.profile.profile_serializer_factory import (
    ProfileSerializerFactory,
)


class ProfileView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

    def get_serializer_class(self):
        action = "read" if self.request.method == "GET" else "write"
        return ProfileSerializerFactory.get_serializer(self.request.user, action)
