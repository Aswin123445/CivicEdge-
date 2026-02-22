from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsCitizen

from apps.issues.serializers.issue_draft_list_serializer import IssueDraftListSerializer
from apps.issues.selectors.issue_drafts import get_user_draft_issues


class IssueDraftListView(ListAPIView):
    serializer_class = IssueDraftListSerializer
    permission_classes = [IsCitizen]

    def get_queryset(self):
        return get_user_draft_issues(user=self.request.user)
