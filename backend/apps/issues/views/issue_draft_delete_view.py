from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.issues.selectors.get_user_draft_issue import get_user_draft_issue
from apps.issues.services.discard_issue_draft import discard_issue_draft


class IssueDraftDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, id):
        issue = get_user_draft_issue(
            issue_id=id,
            user=request.user,
        )

        discard_issue_draft(issue=issue)

        return Response(
            {"detail": "Draft issue deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )
