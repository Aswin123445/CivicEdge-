
from __future__ import annotations

import datetime

from apps.user.permissions.user_permissions import IsAdmin
from rest_framework.views import APIView

from apps.analytics.selectors.volunteer_analytics.volunteer_analytics_selector import get_volunteer_army_analytics
from apps.analytics.serializers.volunteer_analytics.volunteer_analytics_serializer import VolunteerArmyAnalyticsQuerySerializer
from apps.analytics.services.issue_analytics.issue_export_service import workbook_response
from apps.analytics.services.volunteer.volunteer_export_service import build_volunteer_dashboard_excel



class VolunteerDashboardExportView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        query_serializer = VolunteerArmyAnalyticsQuerySerializer(
            data=request.query_params
        )
        query_serializer.is_valid(raise_exception=True)
        params = query_serializer.validated_data

        range_param = params["range"]
        date_from = params.get("date_from")
        date_to = params.get("date_to")
        
        data = get_volunteer_army_analytics(
            range_param=range_param,
            date_from=date_from,
            date_to=date_to,
        )

        workbook = build_volunteer_dashboard_excel(data)

        return workbook_response(
            workbook,
            "issue_dashboard.xlsx"
        )