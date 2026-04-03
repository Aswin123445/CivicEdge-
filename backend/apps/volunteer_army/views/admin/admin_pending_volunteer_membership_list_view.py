from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.selectors.admin.list_submitted_volunteer_memberships import list_submitted_volunteer_memberships
from apps.volunteer_army.serializers.admin.admin_pending_volunteer_membership_list_serializer import AdminPendingVolunteerMembershipListSerializer

class AdminPendingVolunteerMembershipListView(ListAPIView):
    serializer_class = AdminPendingVolunteerMembershipListSerializer
    permission_classes = [IsAdmin]
    search_fields = [
        "reference_id",
        "group__name",
        "user__email"
    ]
    ordering_fields = [
        "-created_at",
    ]
    def get_queryset(self):
        return list_submitted_volunteer_memberships()