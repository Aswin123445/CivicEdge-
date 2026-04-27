from rest_framework.views import APIView
from datetime import date
from apps.analytics.selectors.volunteer_analytics.volunteer_analytics_selector import resolve_date_range
from apps.analytics.services.forum_analytics.forum_analytics_service import get_forum_analytics_data
from apps.user.permissions.user_permissions import IsAdmin
from apps.analytics.services.forum_analytics.forum_analytics_export_service import build_forum_dashboard_excel, workbook_response


class ForumAnalyticsExportView(APIView):
    """
    GET /api/v1/analytics/forum-dashboard/

    Query params
    ------------
    Preset:
        ?range=7d       Last 7 days
        ?range=30d      Last 30 days  (default)
        ?range=90d      Last 90 days
        ?range=1y       Last 365 days

    Custom:
        ?date_from=YYYY-MM-DD
        ?date_from=YYYY-MM-DD&date_to=YYYY-MM-DD

    Other:
        ?top_categories_limit=5   (default 5)
    """
    permission_classes = [IsAdmin]

    def get(self, request):
        range_param = request.query_params.get("range", "30d")

        date_from_str = request.query_params.get("date_from")
        date_to_str   = request.query_params.get("date_to")

        # Parse strings to date objects since the selector expects date/datetime
        date_from = date.fromisoformat(date_from_str) if date_from_str else None
        date_to   = date.fromisoformat(date_to_str)   if date_to_str   else None

        current_start, current_end, previous_start, previous_end = resolve_date_range(
            range_param, date_from, date_to
        )


        top_categories_limit = int(
            request.query_params.get("top_categories_limit", 5)
        )

        data = get_forum_analytics_data(
            current_start=current_start,
            current_end=current_end,
            previous_start=previous_start,
            previous_end=previous_end,
            top_categories_limit=top_categories_limit,
        )
        workbook = build_forum_dashboard_excel(data)

        return workbook_response(
            workbook,
            "issue_dashboard.xlsx"
        )