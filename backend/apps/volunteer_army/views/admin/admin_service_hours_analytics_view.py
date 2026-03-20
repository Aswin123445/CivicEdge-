from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.selectors.admin.get_service_hours_analytics import get_service_hours_analytics




class AdminServiceHoursAnalyticsView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request, *args, **kwargs):
        data = get_service_hours_analytics()
        return Response(data, status=status.HTTP_200_OK)