from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsCitizen
from apps.volunteer_army.selectors.citizen.get_active_membership_for_group import get_active_membership_for_group
from apps.volunteer_army.selectors.citizen.get_joinable_volunteer_event import get_joinable_volunteer_event
from apps.volunteer_army.services.citizen.join_volunteer_event import join_volunteer_event



class CitizenVolunteerEventJoinView(APIView):
    permission_classes = [IsCitizen]

    def post(self, request, *args, **kwargs):
        event = get_joinable_volunteer_event(
            event_id=kwargs["event_id"],
            user=request.user,
        )

        membership = get_active_membership_for_group(
            user=request.user,
            group=event.group,
        )

        participation = join_volunteer_event(
            event=event,
            membership=membership,
        )

        return Response(
            {
                "detail": "Joined event successfully.",
                "participation_id": str(participation.id),
                "reference_id": participation.reference_id,
                "status": participation.status,
            },
            status=status.HTTP_201_CREATED,
        )