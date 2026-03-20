from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.selectors.admin.list_admin_volunteer_events import list_admin_volunteer_events
from apps.volunteer_army.serializers.admin.admin_volunteer_event_list_serializer import AdminVolunteerEventListSerializer


class AdminVolunteerEventListView(ListAPIView):
    serializer_class = AdminVolunteerEventListSerializer
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return list_admin_volunteer_events()