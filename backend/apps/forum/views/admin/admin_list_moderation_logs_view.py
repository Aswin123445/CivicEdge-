from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsAdmin

from apps.forum.selectors.admin.get_moderation_logs_selector import get_moderation_logs
from apps.forum.serializers.admin.moderation_log_list_serializer import ModerationLogListSerializer

class AdminListModerationLogsAPIView(ListAPIView):
    permission_classes = [IsAdmin]
    serializer_class = ModerationLogListSerializer

    def get_queryset(self):
        target_type = self.request.query_params.get("target_type")
        action = self.request.query_params.get("action")
        moderator_id = self.request.query_params.get("moderator")

        return get_moderation_logs(
            target_type=target_type,
            action=action,
            moderator_id=moderator_id,
        )