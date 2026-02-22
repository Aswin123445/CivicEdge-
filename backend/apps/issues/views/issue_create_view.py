from rest_framework.generics import CreateAPIView

from apps.issues.serializers.issue_create_serializer import IssueCreateSerializer
from apps.issues.services.issue_create_service import create_draft_issue
from apps.user.permissions.user_permissions import IsCitizen


class IssueCreateView(CreateAPIView):
    serializer_class = IssueCreateSerializer
    permission_classes = [IsCitizen]

    def perform_create(self, serializer):
        create_draft_issue(
            user=self.request.user,
            data=serializer.validated_data,
        )
