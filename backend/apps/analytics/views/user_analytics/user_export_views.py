
from __future__ import annotations

import datetime

from apps.user.permissions.user_permissions import IsAdmin
from rest_framework.views import APIView

from apps.analytics.services.user_anlaytics.user_analytics_service import get_user_analytics_service
from apps.analytics.services.user_anlaytics.build_user_dashboard_excel import build_user_dashboard_excel, workbook_response
from apps.analytics.serializers.user_analytics.user_analytics_serilzers import UserAnalyticsFilterSerializer




def _parse_date(value: str | None) -> datetime.date | None:
    """Safely parse a YYYY-MM-DD string; returns None on failure."""
    if not value:
        return None
    try:
        return datetime.date.fromisoformat(value)
    except ValueError:
        return None


class UserDashboardExportView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        filter_serializer = UserAnalyticsFilterSerializer(data=request.query_params)
        filter_serializer.is_valid(raise_exception=True)
        data = get_user_analytics_service(filters=filter_serializer.validated_data)

        workbook = build_user_dashboard_excel(data)

        return workbook_response(
            workbook,
            "issue_dashboard.xlsx"
        )