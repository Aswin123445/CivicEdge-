from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.services.admin.archive_volunteer_group import archive_volunteer_group
from apps.volunteer_army.selectors.admin.get_volunteer_group_by_id import get_volunteer_group_by_id


class AdminVolunteerGroupArchiveView(APIView):

    permission_classes = [IsAdmin]

    def post(self, request, *args, **kwargs):

        group = get_volunteer_group_by_id(kwargs["group_id"])

        archive_volunteer_group(
            group=group,
            by=request.user,
        )

        return Response(
            {"detail": "Group archived successfully."},
            status=status.HTTP_200_OK,
        )