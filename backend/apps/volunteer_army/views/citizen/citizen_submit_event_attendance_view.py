from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsCitizen 

from apps.volunteer_army.selectors.citizen.get_user_event_participation import get_user_event_participation
from apps.volunteer_army.services.citizen.submit_event_attendance import submit_event_attendance
from apps.volunteer_army.serializers.citizen.citizen_submit_attendance_serializer import CitizenSubmitAttendanceSerializer


class CitizenSubmitEventAttendanceView(APIView):
    permission_classes = [IsCitizen]

    def post(self, request, *args, **kwargs):
        serializer = CitizenSubmitAttendanceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        participation = get_user_event_participation(
            participation_id=kwargs["participation_id"],
            user=request.user,
        )

        submit_event_attendance(
            participation=participation,
            evidence_url=serializer.validated_data["attendance_evidence_url"],
            by=request.user,
        )

        return Response(
            {"detail": "Attendance submitted successfully."},
            status=status.HTTP_200_OK,
        )