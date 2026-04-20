from rest_framework.views import APIView
from rest_framework.response import Response
from  apps.user.permissions.user_permissions import IsAdmin

from apps.profiles.selectors.admin_dashboard_selector import get_dashboard_metrics
from apps.profiles.serializers.profile.admin_dashboard_serlilizer import DashboardMetricsSerializer




class DashboardMetricsAPIView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        data = get_dashboard_metrics(request.user)
        serializer = DashboardMetricsSerializer(data)
        return Response(serializer.data)