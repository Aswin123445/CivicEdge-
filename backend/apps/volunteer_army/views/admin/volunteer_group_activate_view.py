from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.volunteer_army.services.admin.activate_volunteer_group import activate_volunteer_group
from apps.volunteer_army.selectors.admin.get_volunteer_group_by_id import get_volunteer_group_by_id
from apps.user.permissions.user_permissions import IsAdmin

class AdminVolunteerGroupActivateView(APIView):

    permission_classes = [IsAdmin]

    def post(self, request, *args, **kwargs):

        group = get_volunteer_group_by_id(kwargs["group_id"])

        activate_volunteer_group(
            group=group,
            by=request.user,
        )

        return Response(
            {"detail": "Group activated successfully."},
            status=status.HTTP_200_OK,
        )