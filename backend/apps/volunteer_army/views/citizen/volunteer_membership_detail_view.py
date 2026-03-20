from rest_framework.generics import RetrieveAPIView

from apps.volunteer_army.selectors.citizen.get_user_membership import get_user_membership
from apps.volunteer_army.serializers.citizen.volunteer_membership_detail_serializer import VolunteerMembershipDetailSerializer
from apps.user.permissions.user_permissions import IsCitizen



class VolunteerMembershipDetailView(RetrieveAPIView):

    serializer_class = VolunteerMembershipDetailSerializer
    permission_classes = [IsCitizen]
    lookup_url_kwarg = "membership_id"

    def get_object(self):
        return get_user_membership(
            membership_id=self.kwargs["membership_id"],
            user=self.request.user,
        )