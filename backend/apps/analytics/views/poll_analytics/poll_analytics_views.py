from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.user.permissions.user_permissions import IsAdmin
from apps.analytics.serializers.poll_analytics.poll_analytics_serilazer import PollAnalyticsSerializer
from apps.analytics.services.poll_analytics.poll_analytics_service import get_analytics_data
from apps.analytics.utils.date_range import resolve_date_range, resolve_previous_range




class PollAnalyticsView(APIView):
    """
    GET /api/polls/analytics/
 
    Query params
    ------------
    Preset ranges:
        ?range=7d          Last 7 days  (default: 30d)
        ?range=30d         Last 30 days
        ?range=90d         Last 90 days
        ?range=1y          Last 365 days
 
    Custom range:
        ?date_from=YYYY-MM-DD              From date to today
        ?date_from=YYYY-MM-DD&date_to=YYYY-MM-DD   Explicit window
 
    Other:
        ?top_polls_limit=10   Number of top polls returned (default 10)
 
    Notes
    -----
    - `date_from` / `date_to` take precedence over `range`.
    - The previous period (used for % change) is automatically calculated
      as a window of the same length immediately before the current window.
    """
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
 
        serializer = PollAnalyticsSerializer(data)
        return Response(serializer.data, status=status.HTTP_200_OK)
 
