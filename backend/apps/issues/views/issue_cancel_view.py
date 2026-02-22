from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.issues.selectors.get_user_issue import get_user_issue
from apps.issues.services.cancel_issue import cancel_issue


class IssueCancelView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        issue = get_user_issue(
            issue_id=id,
            user=request.user,
        )

        cancel_issue(
            issue=issue,
            user=request.user,
        )

        return Response(
            {"detail": "Issue cancelled successfully."},
            status=status.HTTP_200_OK,
        )
