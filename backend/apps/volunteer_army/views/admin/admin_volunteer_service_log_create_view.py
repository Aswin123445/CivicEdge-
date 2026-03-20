from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.user.permissions.user_permissions import IsAdmin 

from apps.volunteer_army.services.admin.create_volunteer_service_log import create_volunteer_service_log
from apps.volunteer_army.selectors.admin.get_admin_event_participation import get_admin_event_participation
from apps.volunteer_army.serializers.admin.admin_volunteer_service_log_create_serializer import AdminVolunteerServiceLogCreateSerializer


class AdminVolunteerServiceLogCreateView(APIView):
    permission_classes = [IsAdmin]

    def post(self, request, *args, **kwargs):
        serializer = AdminVolunteerServiceLogCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        participation = get_admin_event_participation(
            participation_id=kwargs["participation_id"],
        )

        service_log = create_volunteer_service_log(
            participation=participation,
            service_hours=serializer.validated_data["service_hours"],
            description=serializer.validated_data.get("description", ""),
            by=request.user,
        )

        return Response(
            {
                "detail": "Service log created successfully.",
                "service_log_id": str(service_log.id),
                "reference_id": service_log.reference_id,
            },
            status=status.HTTP_201_CREATED,
        )