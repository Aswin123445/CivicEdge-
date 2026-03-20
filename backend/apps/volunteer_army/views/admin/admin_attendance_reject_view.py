from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.selectors.admin.get_admin_attendance_submission import get_admin_attendance_submission
from apps.volunteer_army.services.admin.reject_attendance_submission import reject_attendance_submission



class AdminAttendanceRejectView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, *args, **kwargs):
        participation = get_admin_attendance_submission(
            attendance_id=kwargs["attendance_id"],
        )

        reject_attendance_submission(
            participation=participation,
            by=request.user,
        )

        return Response(
            {"detail": "Attendance rejected successfully."},
            status=status.HTTP_200_OK,
        )