from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.notification.serializers.mark_read_bulk_serializer import MarkReadBulkSerializer
from apps.notification.services.mark_notifications_as_read_bulk_service import (
    mark_notifications_as_read_bulk,
)


class NotificationMarkReadBulkView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = MarkReadBulkSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        result = mark_notifications_as_read_bulk(
            user=request.user,
            ids=serializer.validated_data["ids"],
        )

        return Response(result)