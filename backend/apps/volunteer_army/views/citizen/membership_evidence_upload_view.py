from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from apps.volunteer_army.serializers.citizen.membership_evidence_create_serializer import MembershipEvidenceCreateSerializer
from apps.volunteer_army.services.citizen.upload_membership_evidence import upload_membership_evidence
from apps.volunteer_army.selectors.citizen.get_user_membership import get_user_membership
from apps.user.permissions.user_permissions import IsCitizen


class MembershipEvidenceUploadView(CreateAPIView):

    serializer_class = MembershipEvidenceCreateSerializer
    permission_classes = [IsCitizen]

    def create(self, request, *args, **kwargs):

        membership = get_user_membership(
            membership_id=kwargs["membership_id"],
            user=request.user,
        )

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        evidence = upload_membership_evidence(
            membership=membership,
            file_url=serializer.validated_data["file_url"],
            description=serializer.validated_data.get("description"),
        )

        return Response(
            MembershipEvidenceCreateSerializer(evidence).data,
            status=status.HTTP_201_CREATED,
        )