from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.issues.serializers.issue_evidence_create_serializer import IssueEvidenceCreateSerializer
from apps.issues.selectors.get_user_draft_issue import get_user_draft_issue
from apps.issues.services.add_issue_evidence import add_issue_evidence
from apps.user.permissions.user_permissions import IsCitizen
from apps.issues.permissions.citizen_issue_change_permisson import IsComplaintOpen

class IssueEvidenceCreateView(APIView):
    permission_classes = [IsCitizen, IsComplaintOpen]

    def post(self, request, id):
        issue = get_user_draft_issue(
            issue_id=id,
            user=request.user,
        )
        self.check_object_permissions(request, issue)
        serializer = IssueEvidenceCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        evidence = add_issue_evidence(
            issue=issue,
            user=request.user,
            data=serializer.validated_data,
        )

        return Response(
            {
                "id": evidence.id,
                "reference_id": evidence.reference_id,
                "detail": "Evidence added successfully.",
            },
            status=status.HTTP_201_CREATED,
        )
