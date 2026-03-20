from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsCitizen
from apps.volunteer_army.selectors.citizen.list_visible_volunteer_events import list_visible_volunteer_events
from apps.volunteer_army.serializers.citizen.citizen_volunteer_event_list_serializer import CitizenVolunteerEventListSerializer

class CitizenVolunteerEventListView(ListAPIView):
    serializer_class = CitizenVolunteerEventListSerializer
    permission_classes = [IsCitizen]

    def get_queryset(self):
        return list_visible_volunteer_events(user=self.request.user)