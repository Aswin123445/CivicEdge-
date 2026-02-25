from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apps.issues.services.get_issue_home_summary import get_issue_home_summary
from apps.issues.serializers.issue_home_summary_serializer import IssueHomeSummarySerializer


class IssueHomeSummaryAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        summary = get_issue_home_summary(user=request.user)
        print(summary)
        serializer = IssueHomeSummarySerializer(summary)
        return Response(serializer.data)