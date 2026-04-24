"""
views.py — thin controller.

Responsibilities:
  - Parse and coerce query params.
  - Delegate to service.
  - Serialize and return response.

No business logic, no ORM calls.
"""
from __future__ import annotations

import datetime

from apps.user.permissions.user_permissions import IsAdmin
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.analytics.serializers.issue_analytics.issue_dashboard_serializer import IssueDashboardSerializer
from apps.analytics.services.issue_analytics.issue_analytics_service import get_issues_dashboard




def _parse_date(value: str | None) -> datetime.date | None:
    """Safely parse a YYYY-MM-DD string; returns None on failure."""
    if not value:
        return None
    try:
        return datetime.date.fromisoformat(value)
    except ValueError:
        return None


class IssueDashboardView(APIView):
    """
    GET /api/v1/admin/analytics/issues-dashboard/

    Query params
    ────────────
    range       : "7d" | "30d" | "90d" | "1y" | "custom"  (default: 30d)
    date_from   : YYYY-MM-DD  (required when range=custom)
    date_to     : YYYY-MM-DD  (required when range=custom)
    """

    permission_classes = [IsAdmin]

    def get(self, request: Request) -> Response:
        range_param = request.query_params.get("range")
        date_from = _parse_date(request.query_params.get("date_from"))
        date_to = _parse_date(request.query_params.get("date_to"))

        data = get_issues_dashboard(
            range_param=range_param,
            date_from=date_from,
            date_to=date_to,
        )

        serializer = IssueDashboardSerializer(data)
        return Response(serializer.data)