from rest_framework.generics import RetrieveAPIView
from apps.user.permissions.user_permissions import IsAdmin


from apps.volunteer_army.selectors.admin.get_admin_volunteer_group import get_admin_volunteer_group
from apps.volunteer_army.serializers.admin.admin_volunteer_group_detail_serializer import AdminVolunteerGroupDetailSerializer
class AdminVolunteerGroupDetailView(RetrieveAPIView):
    serializer_class = AdminVolunteerGroupDetailSerializer
    permission_classes = [IsAdmin]
    lookup_url_kwarg = "group_id"

    def get_object(self):
        return get_admin_volunteer_group(
            group_id=self.kwargs["group_id"],
        )