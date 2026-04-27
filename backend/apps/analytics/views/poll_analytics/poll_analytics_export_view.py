
from __future__ import annotations


from apps.user.permissions.user_permissions import IsAdmin
from rest_framework.views import APIView

from apps.analytics.services.poll_analytics.poll_analytics_service import get_analytics_data
from apps.analytics.utils.date_range import resolve_date_range, resolve_previous_range
from apps.analytics.services.poll_analytics.poll_analytics_export_service import build_poll_dashboard_excel, workbook_response



class PollDashboardExportView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        # Resolve date window — raises ValidationError on bad input
        current_start, current_end = resolve_date_range(request.query_params)
        previous_start, previous_end = resolve_previous_range(current_start, current_end)
 
        top_polls_limit = int(request.query_params.get("top_polls_limit", 5))
 
        data = get_analytics_data(
            current_start=current_start,
            current_end=current_end,
            previous_start=previous_start,
            previous_end=previous_end,
            top_polls_limit=top_polls_limit,
        )
 

        workbook = build_poll_dashboard_excel(data)

        return workbook_response(
            workbook,
            "issue_dashboard.xlsx"
        )