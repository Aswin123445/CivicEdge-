from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsCitizen
from apps.volunteer_army.selectors.citizen.list_user_memberships import list_user_memberships
from apps.volunteer_army.serializers.citizen.volunteer_membership_list_serializer import VolunteerMembershipListSerializer



class MyVolunteerMembershipListView(ListAPIView):

    serializer_class = VolunteerMembershipListSerializer
    permission_classes = [IsCitizen]

    def get_queryset(self):
        return list_user_memberships(self.request.user)