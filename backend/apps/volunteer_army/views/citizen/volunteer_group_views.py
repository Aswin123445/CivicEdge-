from rest_framework.generics import ListAPIView, RetrieveAPIView

from apps.volunteer_army.selectors.citizen.volunteer_group_selectors import (
    get_active_volunteer_group,
    list_active_volunteer_groups,
    my_list_active_volunteer_memberships,
)

from apps.volunteer_army.serializers.citizen.volunteer_group_serializers import (
    VolunteerGroupDetailSerializer,
    VolunteerGroupListSerializer,
)
from apps.user.permissions.user_permissions import IsCitizen
from apps.volunteer_army.serializers.citizen.MyVolunteerGroupListSerializer import MyVolunteerGroupListSerializer


class VolunteerGroupListView(ListAPIView):
    permission_classes = [IsCitizen]
    serializer_class = VolunteerGroupListSerializer
    search_fields = [
        "reference_id",
        "name",
    ]
    filterset_fields = [
        "membership_type",
        "risk_level"
    ]

    def get_queryset(self):
        return list_active_volunteer_groups()
    
class MyVolunteerGroupListView(ListAPIView):
    permission_classes = [IsCitizen]
    serializer_class = MyVolunteerGroupListSerializer
    search_fields = [
        "reference_id",
        "group__name",
    ]

    def get_queryset(self):
        return my_list_active_volunteer_memberships(self.request.user)
    
    
class VolunteerGroupDetailView(RetrieveAPIView):
    permission_classes = [IsCitizen]
    serializer_class = VolunteerGroupDetailSerializer
    lookup_url_kwarg = "group_id"

    def get_object(self):
        group_id = self.kwargs.get("group_id")
        return get_active_volunteer_group(group_id)