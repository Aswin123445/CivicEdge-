from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.selectors.admin.get_admin_volunteer_membership import get_admin_volunteer_membership
from apps.volunteer_army.services.admin.approve_volunteer_membership import approve_volunteer_membership


class AdminVolunteerMembershipApproveView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, *args, **kwargs):
        membership = get_admin_volunteer_membership(
            membership_id=kwargs["membership_id"],
        )

        approve_volunteer_membership(
            membership=membership,
            by=request.user,
        )

        return Response(
            {"detail": "Membership approved successfully."},
            status=status.HTTP_200_OK,
        )