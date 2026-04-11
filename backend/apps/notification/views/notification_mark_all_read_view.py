from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.notification.services.mark_all_notifications_as_read_service import mark_all_notifications_as_read

class NotificationMarkAllReadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        mark_all_notifications_as_read(request.user)

        return Response({
            "message": "All notifications marked as read"
        })