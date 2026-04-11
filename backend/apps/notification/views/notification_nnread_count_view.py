from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.notification.selectors.get_unread_notification_count import get_unread_notification_count

class NotificationUnreadCountView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        state = request.user.notification_state

        count = get_unread_notification_count(
            user=request.user,
            last_seen_at=state.last_seen_at
        )

        return Response({
            "unread_count": count
        })