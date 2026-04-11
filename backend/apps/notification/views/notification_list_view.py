from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from apps.notification.serializers.notification_serializer import NotificationSerializer
from apps.notification.selectors.get_user_notifications import get_user_notifications
from apps.notification.utils.pagination import NotificationPagination


class NotificationListView(ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = NotificationPagination

    def get_queryset(self):
        return get_user_notifications(self.request.user)