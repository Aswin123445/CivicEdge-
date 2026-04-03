from rest_framework.generics import ListAPIView

from apps.volunteer_army.selectors.admin.list_all_volunteer_groups import list_active_volunteer_groups, list_all_volunteer_groups
from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.serializers.admin.admin_active_volunteer_group_serializer import AdminActiveVolunteerGroupSerializer

class AdminActiveVolunteerGroupListView(ListAPIView):

    serializer_class = AdminActiveVolunteerGroupSerializer
    permission_classes = [IsAdmin]
    pagination_class = None

    def get_queryset(self):
        return list_active_volunteer_groups()
