from rest_framework.generics import RetrieveAPIView

from apps.polls.selectors.get_poll_detail import get_poll_detail
from apps.polls.serializers.poll_detail_serializer import PollDetailSerializer
from apps.user.permissions.user_permissions import IsCitizen


class PollDetailView(RetrieveAPIView):
    permission_classes = [IsCitizen]
    serializer_class = PollDetailSerializer
    lookup_url_kwarg = "poll_id"

    def get_object(self):
        poll, results, total_votes, user_choice = get_poll_detail(
            poll_id=self.kwargs["poll_id"],
            user=self.request.user
        )

        self._extra_context = {
            "results": results,
            "total_votes": total_votes,
            "user_choice": user_choice,
        }

        return poll

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update(getattr(self, "_extra_context", {}))
        return context