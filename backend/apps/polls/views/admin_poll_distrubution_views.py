from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from apps.polls.selectors.get_poll_distribution import get_poll_distribution
from apps.polls.serializers.poll_distribution_serializer import PollDistributionSerializer
from apps.user.permissions.user_permissions import IsAdmin


class PollDistributionView(GenericAPIView):
    permission_classes = [IsAdmin]
    serializer_class = PollDistributionSerializer

    def get(self, request, poll_id):
        data = get_poll_distribution(poll_id=poll_id)
        serializer = self.get_serializer(data)
        return Response(serializer.data)