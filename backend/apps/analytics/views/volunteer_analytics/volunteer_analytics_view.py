from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response

from apps.user.permissions.user_permissions import IsAdmin
from apps.analytics.selectors.volunteer_analytics.volunteer_analytics_selector import get_volunteer_army_analytics
from apps.analytics.serializers.volunteer_analytics.volunteer_analytics_serializer import VolunteerArmyAnalyticsQuerySerializer



class VolunteerArmyAnalyticsView(APIView):
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


        return Response(data)