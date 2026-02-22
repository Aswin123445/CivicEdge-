from rest_framework.generics import RetrieveAPIView
from apps.user.permissions.user_permissions import IsCitizen

from apps.issues.serializers.issue_draft_detail_serializer import IssueDraftDetailSerializer
from apps.issues.selectors.get_user_draft_issue import get_user_draft_issue


class IssueDraftDetailView(RetrieveAPIView):
    serializer_class = IssueDraftDetailSerializer
    permission_classes = [IsCitizen]

    def get_object(self):
        return get_user_draft_issue(
            issue_id=self.kwargs["id"],
            user=self.request.user,
        )
