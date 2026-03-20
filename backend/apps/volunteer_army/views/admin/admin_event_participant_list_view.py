from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.selectors.admin.list_event_participants_for_admin import list_event_participants_for_admin
from apps.volunteer_army.serializers.admin.admin_event_participant_list_serializer import AdminEventParticipantListSerializer



class AdminEventParticipantListView(ListAPIView):
    serializer_class = AdminEventParticipantListSerializer
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return list_event_participants_for_admin(
            event_id=self.kwargs["event_id"],
        )