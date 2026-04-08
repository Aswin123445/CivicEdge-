from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from apps.polls.selectors.get_home_polls import get_home_polls
from apps.polls.serializers.home_poll_serializer import HomePollSerializer
from rest_framework.permissions import AllowAny


class HomePollView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = HomePollSerializer

    def get(self, request, *args, **kwargs):
        data = get_home_polls()
        serializer = self.get_serializer(data)
        return Response(serializer.data)