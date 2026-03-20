from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsCitizen
from apps.volunteer_army.selectors.citizen.get_user_event_participation import get_user_event_participation
from apps.volunteer_army.services.citizen.leave_volunteer_event_participation import leave_volunteer_event_participation




class CitizenVolunteerParticipationLeaveView(APIView):
    permission_classes = [IsCitizen]

    def post(self, request, *args, **kwargs):
        participation = get_user_event_participation(
            participation_id=kwargs["participation_id"],
            user=request.user,
        )

        leave_volunteer_event_participation(
            participation=participation,
            by=request.user,
        )

        return Response(
            {"detail": "Participation left successfully."},
            status=status.HTTP_200_OK,
        )