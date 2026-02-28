from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.issues.services.issue_detail_service import get_issue_detail

class ComplaintDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        data = get_issue_detail(id, request.user)
        return Response(data)