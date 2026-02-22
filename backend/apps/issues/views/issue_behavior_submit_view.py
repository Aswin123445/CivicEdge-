from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.issues.selectors.get_user_draft_issue import get_user_draft_issue
from apps.issues.serializers.issue_behavior_responseItem_serializer import IssueBehaviorSubmitSerializer
from apps.issues.services.submit_issue_behavior import submit_issue_behavior

class IssueBehaviorSubmitView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        issue = get_user_draft_issue(issue_id=id, user=request.user)

        serializer = IssueBehaviorSubmitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        submit_issue_behavior(
            issue=issue,
            user=request.user,
            responses=serializer.validated_data["responses"],
        )

        return Response(
            {"detail": "Behavioral responses saved."},
            status=status.HTTP_200_OK,
        )
