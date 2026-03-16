from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404

from apps.issues.serializers.issue_review_serializer import IssueReviewSerializer 
from apps.issues.selectors.issue_review import get_issue_review_data
from apps.issues.models.issues import Issue  
class IssueReviewView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        issue = get_object_or_404(Issue, id=id, reporter=request.user)
        data = get_issue_review_data(
            issue=issue,
            user=request.user,
        )

        serializer = IssueReviewSerializer(data)
        return Response(serializer.data)