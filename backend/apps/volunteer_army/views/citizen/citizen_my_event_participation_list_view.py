from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsCitizen

from apps.volunteer_army.selectors.citizen.list_user_event_participations import list_user_event_participations
from apps.volunteer_army.serializers.citizen.citizen_event_participation_list_serializer import CitizenEventParticipationListSerializer



class CitizenMyEventParticipationListView(ListAPIView):
    serializer_class = CitizenEventParticipationListSerializer
    permission_classes = [IsCitizen]
    search_fields = [
        "reference_id",
        "event__title",
    ]
    filterset_fields = [
        "status",
    ]
    ordering_fields = [
        "created_at",
    ]
    ordering = ["-created_at"]

    def get_queryset(self):
        return list_user_event_participations(user=self.request.user,on_status=self.request.query_params.get("on_status"),)