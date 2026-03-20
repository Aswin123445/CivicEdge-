from rest_framework.generics import CreateAPIView
from apps.user.permissions.user_permissions import IsAdmin 

from apps.volunteer_army.serializers.admin.admin_volunteer_event_create_serializer import AdminVolunteerEventCreateSerializer
from apps.volunteer_army.services.admin.create_volunteer_event import create_volunteer_event
from apps.volunteer_army.selectors.admin.get_admin_volunteer_group import get_admin_volunteer_group
class AdminVolunteerEventCreateView(CreateAPIView):
    serializer_class = AdminVolunteerEventCreateSerializer
    permission_classes = [IsAdmin]

    def perform_create(self, serializer):
        group = get_admin_volunteer_group(
            group_id=serializer.validated_data["group"].id,
        )

        event = create_volunteer_event(
            group=group,
            title=serializer.validated_data["title"],
            description=serializer.validated_data.get("description", ""),
            location_name=serializer.validated_data["location_name"],
            location_address=serializer.validated_data["location_address"],
            start_time=serializer.validated_data["start_time"],
            end_time=serializer.validated_data["end_time"],
            capacity=serializer.validated_data["capacity"],
            sponsor_name=serializer.validated_data.get("sponsor_name", ""),
            sponsor_website=serializer.validated_data.get("sponsor_website", ""),
            sponsor_logo_url=serializer.validated_data.get("sponsor_logo_url", ""),
            sponsor_message=serializer.validated_data.get("sponsor_message", ""),
            by=self.request.user,
        )

        serializer.instance = event