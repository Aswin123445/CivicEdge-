from rest_framework.generics import ListAPIView

from apps.volunteer_army.selectors.admin.list_all_volunteer_groups import list_all_volunteer_groups
from apps.volunteer_army.serializers.admin.admin_volunteer_group_list_serializer import AdminVolunteerGroupListSerializer
from apps.user.permissions.user_permissions import IsAdmin

class AdminVolunteerGroupListView(ListAPIView):

    serializer_class = AdminVolunteerGroupListSerializer
    permission_classes = [IsAdmin]

    def get_queryset(self):
        return list_all_volunteer_groups()