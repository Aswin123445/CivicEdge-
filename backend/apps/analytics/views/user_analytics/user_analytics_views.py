from rest_framework.views import APIView
from apps.user.permissions.user_permissions import IsAdmin
from rest_framework.request import Request
from rest_framework.response import Response

from apps.analytics.serializers.user_analytics.user_analytics_serilzers import UserAnalyticsDashboardSerializer, UserAnalyticsFilterSerializer
from apps.analytics.services.user_anlaytics.user_analytics_service import get_user_analytics_service

class UserAnalyticsView(APIView):
    """
    GET /api/v1/admin/analytics/users/
 
    Query params
    ────────────
    range       : "7d" | "30d" | "90d" | "1y" | "custom"  (default: 30d)
    date_from   : YYYY-MM-DD  (required when range=custom)
    date_to     : YYYY-MM-DD  (required when range=custom)
 
    Response
    ────────
    {
        "success": true,
        "message": "User analytics fetched successfully.",
        "data": {
            "stats":            { ... },
            "distribution":     [ { name, value } ],
            "growth":           [ { date, users } ],
            "zone_solver_chart":[ { zone, solvers, active_solvers } ]
        }
    }
    """
 
    permission_classes = [IsAdmin]
 
    def get(self, request: Request) -> Response:
        # 1. Validate filter params via serializer (raises 400 on bad input)
        filter_serializer = UserAnalyticsFilterSerializer(data=request.query_params)
        filter_serializer.is_valid(raise_exception=True)
 
        # 2. Delegate entirely to the service
        data = get_user_analytics_service(filters=filter_serializer.validated_data)
 
        # 3. Protect the response shape via the output serializer
        out = UserAnalyticsDashboardSerializer(data)
 
        return Response(out.data)
