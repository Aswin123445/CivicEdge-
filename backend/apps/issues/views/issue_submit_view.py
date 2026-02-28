# apps/issues/views/issue_submit_view.py
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.issues.models.issues import Issue
from apps.issues.serializers.issue_submit_serializer import IssueSubmitSerializer
from apps.issues.services.issue_submit_service import submit_issue
from rest_framework.permissions import IsAuthenticated


class IssueSubmitView(APIView):
    """
    Submit a draft issue for review.
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        serializer = IssueSubmitSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        issue = get_object_or_404(
            Issue.objects.select_related("location").prefetch_related(
                "evidences", "behavioral_responses"
            ),
            id=id,
        )

        submit_issue(issue=issue, user=request.user)

        return Response(
            {
                "id": issue.id,
                "reference_id": issue.reference_id,
                "status": "SUBMITTED",
                "detail": "Issue submitted successfully.",
            },
            status=status.HTTP_200_OK,
        )
