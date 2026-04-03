from rest_framework.views import APIView
from rest_framework.response import Response
from apps.user.permissions.user_permissions import IsCitizen
from apps.volunteer_army.serializers.citizen.FeaturedGroupSerializer import CitizenHomePageSerializer
from apps.volunteer_army.services.citizen.get_citizen_volunteer_home_page import get_citizen_home_page

class CitizenHomePageView(APIView):
    """
    GET /api/volunteer-army/citizen/home/

    Returns the full citizen home page payload:
        quick_actions   — memberships, participations, recognitions counts
        featured_groups — top 3 active groups
        upcoming_events — next 5 upcoming published events

    Auth: JWT required (IsAuthenticated)
    """
    permission_classes = [IsCitizen]

    def get(self, request):
        data = get_citizen_home_page(user=request.user)
        serializer = CitizenHomePageSerializer(data)
        return Response(serializer.data)