from rest_framework.generics import RetrieveAPIView
from apps.user.permissions.user_permissions import IsAdmin
from apps.volunteer_army.selectors.admin.get_admin_volunteer_membership import get_admin_volunteer_membership
from apps.volunteer_army.serializers.admin.admin_membership_evidence_serializer import AdminVolunteerMembershipDetailSerializer



class AdminVolunteerMembershipDetailView(RetrieveAPIView):
    serializer_class = AdminVolunteerMembershipDetailSerializer
    permission_classes = [IsAdmin]
    lookup_url_kwarg = "membership_id"

    def get_object(self):
        return get_admin_volunteer_membership(
            membership_id=self.kwargs["membership_id"],
        )