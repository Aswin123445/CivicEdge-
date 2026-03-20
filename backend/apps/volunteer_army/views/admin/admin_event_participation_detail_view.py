from rest_framework.generics import RetrieveAPIView
from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.selectors.admin.get_admin_event_participation import get_admin_event_participation
from apps.volunteer_army.serializers.admin.admin_event_participation_detail_serializer import AdminEventParticipationDetailSerializer

class AdminEventParticipationDetailView(RetrieveAPIView):
    serializer_class = AdminEventParticipationDetailSerializer
    permission_classes = [IsAdmin]
    lookup_url_kwarg = "participation_id"

    def get_object(self):
        return get_admin_event_participation(
            participation_id=self.kwargs["participation_id"],
        )