from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.services.admin.mark_event_participation_no_show import mark_event_participation_no_show
from apps.volunteer_army.selectors.admin.get_admin_event_participation import get_admin_event_participation




class AdminEventParticipationMarkNoShowView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, *args, **kwargs):
        participation = get_admin_event_participation(
            participation_id=kwargs["participation_id"],
        )

        mark_event_participation_no_show(
            participation=participation,
            by=request.user,
        )

        return Response(
            {"detail": "Participant marked as no-show successfully."},
            status=status.HTTP_200_OK,
        )