from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.selectors.admin.get_admin_volunteer_event import get_admin_volunteer_event
from apps.volunteer_army.services.admin.cancel_volunteer_event import cancel_volunteer_event



class AdminVolunteerEventCancelView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, *args, **kwargs):
        event = get_admin_volunteer_event(
            event_id=kwargs["event_id"],
        )

        cancel_volunteer_event(
            event=event,
            by=request.user,
        )

        return Response(
            {"detail": "Event cancelled successfully."},
            status=status.HTTP_200_OK,
        )