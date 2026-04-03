from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.selectors.admin.list_event_participants_for_admin import list_event_participants_for_admin
from apps.volunteer_army.serializers.admin.admin_event_participant_list_serializer import AdminEventParticipantListSerializer



class AdminEventParticipantListView(ListAPIView):
    serializer_class = AdminEventParticipantListSerializer
    permission_classes = [IsAdmin]
    search_fields = [
        "reference_id",
        "membership__user__email",
    ]
    filterset_fields = [
        "status",
    ]
    ordering_fields = [
        "-created_at",
    ]
    def get_queryset(self):
        return list_event_participants_for_admin(
            event_id=self.kwargs["event_id"],
        )
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        recored = queryset.first()
        if recored :
            event_title = recored.event.title
            event_reference_id = recored.event.reference_id
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response =  self.get_paginated_response(serializer.data)
            if recored :
                response.data['event_title'] = event_title
                response.data['event_reference_id'] = event_reference_id
            return response