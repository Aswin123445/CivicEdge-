from rest_framework.generics import ListAPIView, RetrieveAPIView

from apps.volunteer_army.selectors.citizen.volunteer_group_selectors import (
    get_active_volunteer_group,
    list_active_volunteer_groups,
)

from apps.volunteer_army.serializers.citizen.volunteer_group_serializers import (
    VolunteerGroupDetailSerializer,
    VolunteerGroupListSerializer,
)
from apps.user.permissions.user_permissions import IsCitizen


class VolunteerGroupListView(ListAPIView):
    permission_classes = [IsCitizen]
    serializer_class = VolunteerGroupListSerializer

    def get_queryset(self):
        return list_active_volunteer_groups()
    
    
class VolunteerGroupDetailView(RetrieveAPIView):
    permission_classes = [IsCitizen]
    serializer_class = VolunteerGroupDetailSerializer
    lookup_url_kwarg = "group_id"

    def get_object(self):
        group_id = self.kwargs.get("group_id")
        return get_active_volunteer_group(group_id)