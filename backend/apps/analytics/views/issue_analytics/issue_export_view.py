
from __future__ import annotations

import datetime

from apps.user.permissions.user_permissions import IsAdmin
from rest_framework.views import APIView

from apps.analytics.services.issue_analytics.issue_analytics_service import get_issues_dashboard
from apps.analytics.services.issue_analytics.issue_export_service import build_issue_dashboard_excel, workbook_response




def _parse_date(value: str | None) -> datetime.date | None:
    """Safely parse a YYYY-MM-DD string; returns None on failure."""
    if not value:
        return None
    try:
        return datetime.date.fromisoformat(value)
    except ValueError:
        return None


class IssueDashboardExportView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        range_param = request.query_params.get("range")

        data = get_issues_dashboard(
            range_param=range_param,
            date_from=None,
            date_to=None,
        )

        workbook = build_issue_dashboard_excel(data)

        return workbook_response(
            workbook,
            "issue_dashboard.xlsx"
        )