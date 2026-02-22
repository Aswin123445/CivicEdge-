from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated


from apps.issues.serializers.behavioral_prompt_serializer import BehavioralPromptSerializer
from apps.issues.selectors.get_behavioral_prompts_for_issue import get_behavioral_prompts_for_issue
from apps.issues.selectors.get_user_draft_issue import get_user_draft_issue


class BehavioralPromptListView(ListAPIView):
    serializer_class = BehavioralPromptSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        issue = get_user_draft_issue(
            issue_id=self.kwargs["id"],
            user=self.request.user,
        )
        return get_behavioral_prompts_for_issue(issue=issue)
