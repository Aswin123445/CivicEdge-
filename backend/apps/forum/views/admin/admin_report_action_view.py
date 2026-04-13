from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from apps.user.permissions.user_permissions import IsAdmin
from apps.forum.serializers.admin.admin_report_action_serializer import AdminReportActionSerializer

from apps.forum.services.admin.admin_report_action_service import admin_take_report_action



class AdminReportActionAPIView(CreateAPIView):
    permission_classes = [ IsAdmin]
    serializer_class = AdminReportActionSerializer

    def create(self, request, *args, **kwargs):
        report_id = self.kwargs.get("id")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        report = admin_take_report_action(
            moderator=request.user,
            report_id=report_id,
            data=serializer.validated_data,
        )

        return Response({
            "id": report.id,
            "status": report.status,
            "message": "Action applied successfully",
        })