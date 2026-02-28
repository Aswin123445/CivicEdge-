from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.issues.serializers.issue_evidence_create_serializer import IssueEvidenceCreateSerializer
from apps.issues.selectors.get_user_draft_issue import get_user_draft_issue
from apps.issues.services.add_issue_evidence import add_issue_evidences
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
        serializer = IssueEvidenceCreateSerializer(data=request.data['evidences'],many=True)
        serializer.is_valid(raise_exception=True)

        evidences = add_issue_evidences(
            issue=issue,
            user=request.user,
            evidences=serializer.validated_data,
        )

        return Response(
            {
                "count": len(evidences),
                "evidences": [
                    {
                        "id": ev.id,
                        "reference_id": ev.reference_id,
                    }
                    for ev in evidences
                ],
                "detail": "Evidences added successfully.",
            },
            status=status.HTTP_201_CREATED,
        )
