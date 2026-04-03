from rest_framework.generics import ListAPIView

from apps.volunteer_army.selectors.admin.list_all_volunteer_groups import list_all_volunteer_groups
from apps.volunteer_army.serializers.admin.admin_volunteer_group_list_serializer import AdminVolunteerGroupListSerializer
from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.models.volunteer_group import VolunteerGroupStatus

class AdminVolunteerGroupListView(ListAPIView):

    serializer_class = AdminVolunteerGroupListSerializer
    permission_classes = [IsAdmin]
    search_fields = [
        "reference_id",
        "name",
        "membership_type",
    ]
    filterset_fields = [
        "status",
    ]
    ordering_fields = [
        "-created_at",
    ]

    def get_queryset(self):
        return list_all_volunteer_groups()
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        active_count = queryset.filter(status=VolunteerGroupStatus.ACTIVE).count() 
        archive_count = queryset.filter(status=VolunteerGroupStatus.ARCHIVED).count()
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response =  self.get_paginated_response(serializer.data)
            response.data['active_count'] = active_count 
            response.data['archive_count'] = archive_count
            return response