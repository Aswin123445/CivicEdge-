from rest_framework.generics import RetrieveAPIView
from apps.user.permissions.user_permissions import IsAdmin

from apps.volunteer_army.selectors.admin.get_admin_attendance_submission import get_admin_attendance_submission
from apps.volunteer_army.serializers.admin.admin_attendance_submission_detail_serializer import AdminAttendanceSubmissionDetailSerializer


class AdminAttendanceSubmissionDetailView(RetrieveAPIView):
    serializer_class = AdminAttendanceSubmissionDetailSerializer
    permission_classes = [IsAdmin]
    lookup_url_kwarg = "attendance_id"

    def get_object(self):
        return get_admin_attendance_submission(
            attendance_id=self.kwargs["attendance_id"],
        )