from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsCitizen

from apps.issues.serializers.issue_location_serializer import IssueLocationSerializer
from apps.issues.selectors.get_user_draft_issue import get_user_draft_issue
from apps.issues.services.attach_issue_location import attach_issue_location
from apps.issues.permissions.citizen_issue_change_permisson import IsComplaintOpen


class IssueLocationCreateView(APIView):
    permission_classes = [IsCitizen, IsComplaintOpen]

    def post(self, request, id):
        issue = get_user_draft_issue(
            issue_id=id,
            user=request.user,
        )
        self.check_object_permissions(request, issue)

        serializer = IssueLocationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        attach_issue_location(
            issue=issue,
            data=serializer.validated_data,
        )

        return Response(
            {"detail": "Location saved successfully."},
            status=status.HTTP_200_OK,
        )
