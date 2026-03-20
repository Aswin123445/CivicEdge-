from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsCitizen
from apps.volunteer_army.selectors.citizen.get_user_membership import get_user_membership
from apps.volunteer_army.selectors.citizen.list_membership_evidences import list_membership_evidences
from apps.volunteer_army.serializers.citizen.membership_evidence_list_serializer import MembershipEvidenceListSerializer

class MembershipEvidenceListView(ListAPIView):

    serializer_class = MembershipEvidenceListSerializer
    permission_classes = [IsCitizen]

    def get_queryset(self):

        membership = get_user_membership(
            membership_id=self.kwargs["membership_id"],
            user=self.request.user,
        )

        return list_membership_evidences(membership=membership)