from rest_framework.generics import CreateAPIView

from apps.polls.serializers.admin_create_poll_serializer import AdminCreatePollSerializer
from apps.polls.services.create_poll_service import create_poll
from apps.user.permissions.user_permissions import IsAdmin

class AdminCreatePollView(CreateAPIView):
    permission_classes = [IsAdmin]
    serializer_class = AdminCreatePollSerializer

    def perform_create(self, serializer):
        self.poll = create_poll(
            admin_user=self.request.user,
            data=serializer.validated_data
        )