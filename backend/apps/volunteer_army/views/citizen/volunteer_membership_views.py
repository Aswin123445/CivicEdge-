from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status

from apps.volunteer_army.serializers.citizen.volunteer_membership_serializers import (
    VolunteerMembershipSerializer,
)

from apps.volunteer_army.services.citizen.volunteer_membership_services import (
    join_volunteer_group,
)

from apps.volunteer_army.selectors.citizen.volunteer_group_selectors import (
    get_active_volunteer_group,
)
from apps.user.permissions.user_permissions import IsCitizen

class VolunteerGroupJoinView(CreateAPIView):
    permission_classes = [IsCitizen]
    serializer_class = VolunteerMembershipSerializer

    def create(self, request, *args, **kwargs):

        group_id = self.kwargs.get("group_id")

        group = get_active_volunteer_group(group_id)

        membership = join_volunteer_group(
            user=request.user,
            group=group,
        )

        serializer = self.get_serializer(membership)

        return Response(serializer.data, status=status.HTTP_201_CREATED)