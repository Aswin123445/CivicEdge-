from rest_framework.generics import ListAPIView
from apps.polls.selectors.get_active_polls import get_active_polls
from apps.polls.serializers.poll_option_serializer import PollListSerializer
from apps.user.permissions.user_permissions import IsCitizen


class PollListView(ListAPIView):
    permission_classes = [IsCitizen]
    serializer_class = PollListSerializer
    search_fields = [
        "reference_id",
        "question",
        "context",
    ]
    ordering_fields = [
        "-created_at",
    ]
    def get_queryset(self):
        return get_active_polls(user=self.request.user)