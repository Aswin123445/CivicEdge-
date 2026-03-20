from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsCitizen
from apps.volunteer_army.selectors.citizen.get_user_membership import get_user_membership
from apps.volunteer_army.services.citizen.leave_membership import leave_membership

class VolunteerMembershipLeaveView(APIView):

    permission_classes = [IsCitizen]

    def post(self, request, *args, **kwargs):

        membership = get_user_membership(
            membership_id=kwargs["membership_id"],
            user=request.user,
        )

        leave_membership(
            membership=membership,
            user=request.user,
        )

        return Response(
            {"detail": "You have left the group."},
            status=status.HTTP_200_OK,
        )