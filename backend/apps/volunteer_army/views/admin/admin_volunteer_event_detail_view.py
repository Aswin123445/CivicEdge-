from rest_framework.generics import RetrieveAPIView
from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.selectors.admin.get_admin_volunteer_event import get_admin_volunteer_event
from apps.volunteer_army.serializers.admin.admin_volunteer_event_eetail_serializer import AdminVolunteerEventDetailSerializer


class AdminVolunteerEventDetailView(RetrieveAPIView):
    serializer_class = AdminVolunteerEventDetailSerializer
    permission_classes = [IsAdmin]
    lookup_url_kwarg = "event_id"

    def get_object(self):
        return get_admin_volunteer_event(
            event_id=self.kwargs["event_id"],
        )