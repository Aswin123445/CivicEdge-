from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.selectors.admin.list_admin_volunteer_events import list_admin_volunteer_events
from apps.volunteer_army.serializers.admin.admin_volunteer_event_list_serializer import AdminVolunteerEventListSerializer
from collections import Counter

class AdminVolunteerEventListView(ListAPIView):
    serializer_class = AdminVolunteerEventListSerializer
    permission_classes = [IsAdmin]
    search_fields = [
        "reference_id",
        "group__name",
        "title",
    ]
    filterset_fields = [
        "status",
    ]
    ordering_fields = [
        "-created_at",
    ]

    def get_queryset(self):
        return list_admin_volunteer_events()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        status_counts = Counter(event.get_runtime_status() for event in queryset)
        upcoming_events_count   = status_counts.get("UPCOMING", 0)
        ongoing_events_count    = status_counts.get("LIVE", 0)
        completed_events_count  = status_counts.get("COMPLETED", 0)
        cancelled_events_count  = status_counts.get("CANCELLED", 0)
        draft_events_count      = status_counts.get("DRAFT", 0)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response =  self.get_paginated_response(serializer.data)
            response.data['upcoming_events_count']   = upcoming_events_count
            response.data['ongoing_events_count']    = ongoing_events_count
            response.data['completed_events_count']  = completed_events_count
            response.data['cancelled_events_count']  = cancelled_events_count
            response.data['draft_events_count']      = draft_events_count
            return response