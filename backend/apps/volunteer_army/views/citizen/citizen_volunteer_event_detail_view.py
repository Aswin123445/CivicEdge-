from rest_framework.generics import RetrieveAPIView
from apps.user.permissions.user_permissions import IsCitizen
from apps.volunteer_army.selectors.citizen.get_visible_volunteer_event import get_visible_volunteer_event
from apps.volunteer_army.serializers.citizen.citizen_volunteer_vvent_detail_serializer import CitizenVolunteerEventDetailSerializer


class CitizenVolunteerEventDetailView(RetrieveAPIView):
    serializer_class = CitizenVolunteerEventDetailSerializer
    permission_classes = [IsCitizen]
    lookup_url_kwarg = "event_id"

    def get_object(self):
        return get_visible_volunteer_event(
            event_id=self.kwargs["event_id"],
            user=self.request.user,
        )