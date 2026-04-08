from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from apps.polls.selectors.get_poll_timeline import get_poll_timeline
from apps.polls.serializers.poll_timeline_serializer import PollTimelineSerializer
from apps.user.permissions.user_permissions import IsAdmin


class PollTimelineView(GenericAPIView):
    permission_classes = [IsAdmin]
    serializer_class = PollTimelineSerializer

    def get(self, request, poll_id):
        data = get_poll_timeline(poll_id=poll_id)
        serializer = self.get_serializer(data)
        return Response(serializer.data)