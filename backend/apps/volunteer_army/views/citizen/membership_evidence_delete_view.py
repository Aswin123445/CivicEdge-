from rest_framework.generics import DestroyAPIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsCitizen
from apps.volunteer_army.selectors.citizen.get_user_membership_evidence import get_user_membership_evidence
from apps.volunteer_army.services.citizen.delete_membership_evidence import delete_membership_evidence

class MembershipEvidenceDeleteView(DestroyAPIView):
    permission_classes = [IsCitizen]
    lookup_url_kwarg = "evidence_id"

    def get_object(self):
        return get_user_membership_evidence(
            evidence_id=self.kwargs["evidence_id"],
            user=self.request.user,
        )

    def destroy(self, request, *args, **kwargs):
        evidence = self.get_object()
        delete_membership_evidence(evidence=evidence)
        return Response(
            {"detail": "Evidence deleted successfully."},
            status=status.HTTP_200_OK,
        )