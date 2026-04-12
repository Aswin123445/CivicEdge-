from rest_framework.generics import CreateAPIView
from apps.user.permissions.user_permissions import IsCitizen
from rest_framework.response import Response
from rest_framework import status

from apps.forum.serializers.citizen.create_forum_report_serializer import CreateForumReportSerializer
from apps.forum.services.citizen.create_forum_report_service import create_forum_report


class CreateForumReportAPIView(CreateAPIView):
    permission_classes = [IsCitizen]
    serializer_class = CreateForumReportSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        report = create_forum_report(
            user=request.user,
            data=serializer.validated_data,
        )

        return Response(
            {
                "id": report.id,
                "status": report.status,
                "message": "Report submitted successfully",
            },
            status=status.HTTP_201_CREATED,
        )