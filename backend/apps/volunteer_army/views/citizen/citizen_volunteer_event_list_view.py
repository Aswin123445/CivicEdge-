from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsCitizen
from apps.volunteer_army.selectors.citizen.list_visible_volunteer_events import (
    list_visible_volunteer_events,
)
from apps.volunteer_army.serializers.citizen.citizen_volunteer_event_list_serializer import (
    CitizenVolunteerEventListSerializer,
)


class CitizenVolunteerEventListView(ListAPIView):
    serializer_class = CitizenVolunteerEventListSerializer
    permission_classes = [IsCitizen]
    search_fields = [
        "reference_id",
        "title",
        "location_name",
    ]
    filterset_fields = [
        "status",
    ]
    ordering_fields = [
        "created_at",
    ]
    ordering = ["-created_at"]

    def get_queryset(self):
        group_id = self.kwargs.get("group_id")
        return list_visible_volunteer_events(
            user=self.request.user,
            on_status=self.request.query_params.get("on_status"),
            group_id=group_id,
        )
