from rest_framework.generics import RetrieveAPIView

from apps.polls.selectors.get_admin_poll_detail import get_admin_poll_detail
from apps.user.permissions.user_permissions import IsAdmin
from apps.polls.serializers.AdminPollDetailSerializer import AdminPollDetailSerializer


class AdminPollDetailView(RetrieveAPIView):
    permission_classes = [IsAdmin]
    serializer_class = AdminPollDetailSerializer
    lookup_url_kwarg = "poll_id"

    def get_object(self):
        poll, results, total_votes = get_admin_poll_detail(
            poll_id=self.kwargs["poll_id"]
        )

        self._poll_meta = {
            "results": results,
            "total_votes": total_votes,
        }

        return poll

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update(getattr(self, "_poll_meta", {}))
        return context