from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from apps.volunteer_army.serializers.admin.volunteer_group_serializers import VolunteerGroupUpdateSerializer
from apps.volunteer_army.services.admin.update_volunteer_group import update_volunteer_group
from apps.volunteer_army.selectors.admin.get_volunteer_group_by_id import get_volunteer_group_by_id
from apps.user.permissions.user_permissions import IsAdmin
class AdminVolunteerGroupUpdateView(UpdateAPIView):

    serializer_class = VolunteerGroupUpdateSerializer
    permission_classes = [IsAdmin]
    lookup_url_kwarg = "group_id"

    def get_object(self):
        return get_volunteer_group_by_id(self.kwargs["group_id"])

    def update(self, request, *args, **kwargs):

        group = self.get_object()

        serializer = self.get_serializer(
            group,
            data=request.data,
            partial=True,  # PATCH support
        )
        serializer.is_valid(raise_exception=True)

        updated_group = update_volunteer_group(
            group=group,
            data=serializer.validated_data,
        )

        return Response(self.get_serializer(updated_group).data)