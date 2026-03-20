from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAdminUser

from apps.volunteer_army.selectors.admin.get_admin_volunteer_event import get_admin_volunteer_event
from apps.volunteer_army.serializers.admin.admin_volunteer_event_update_serializer import AdminVolunteerEventUpdateSerializer
from apps.volunteer_army.services.admin.update_volunteer_event import update_volunteer_event

class AdminVolunteerEventUpdateView(UpdateAPIView):
    serializer_class = AdminVolunteerEventUpdateSerializer
    permission_classes = [IsAdminUser]
    lookup_url_kwarg = "event_id"

    def get_object(self):
        return get_admin_volunteer_event(
            event_id=self.kwargs["event_id"],
        )

    def perform_update(self, serializer):
        event = self.get_object()
        updated_event = update_volunteer_event(
            event=event,
            data=serializer.validated_data,
            by=self.request.user,
        )
        serializer.instance = updated_event