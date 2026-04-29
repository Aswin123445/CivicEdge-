from rest_framework.generics import UpdateAPIView
from apps.polls.services.edit_poll_service import edit_poll
from apps.user.permissions.user_permissions import IsAdmin
from apps.polls.serializers.admin_edit_poll_serilalizer import AdminEditPollSerializer
from apps.polls.selectors.get_poll_selector import get_poll_by_id


class AdminEditPollView(UpdateAPIView):
    permission_classes = [IsAdmin]
    serializer_class = AdminEditPollSerializer
    lookup_field = "id"

    def get_object(self):
        return get_poll_by_id(self.kwargs["id"])

    def perform_update(self, serializer):
        updated_poll = edit_poll(
            admin_user=self.request.user,
            poll=self.get_object(),
            data=serializer.validated_data,
        )
        serializer.instance = updated_poll
