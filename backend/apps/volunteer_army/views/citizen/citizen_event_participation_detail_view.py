from rest_framework.generics import RetrieveAPIView
from apps.user.permissions.user_permissions import IsCitizen
from apps.volunteer_army.selectors.citizen.get_user_event_participation import get_user_event_participation
from apps.volunteer_army.serializers.citizen.citizen_event_participation_detail_serializer import CitizenEventParticipationDetailSerializer



class CitizenEventParticipationDetailView(RetrieveAPIView):
    serializer_class = CitizenEventParticipationDetailSerializer
    permission_classes = [IsCitizen]
    lookup_url_kwarg = "participation_id"

    def get_object(self):
        return get_user_event_participation(
            participation_id=self.kwargs["participation_id"],
            user=self.request.user,
        )