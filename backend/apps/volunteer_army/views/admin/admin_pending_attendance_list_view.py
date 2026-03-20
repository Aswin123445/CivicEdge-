from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsAdmin

from apps.volunteer_army.selectors.admin.list_pending_attendance_submissions import list_pending_attendance_submissions

from apps.volunteer_army.serializers.admin.admin_pending_attendance_list_serializer import AdminPendingAttendanceListSerializer

class AdminPendingAttendanceListView(ListAPIView):
    serializer_class = AdminPendingAttendanceListSerializer
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return list_pending_attendance_submissions()