from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status

from apps.polls.models import Poll
from apps.user.permissions.user_permissions import IsAdmin
from apps.polls.services.close_poll_close_service import close_poll


class AdminClosePollView(GenericAPIView):
    permission_classes = [IsAdmin]

    def patch(self, request, poll_id):
        poll = Poll.objects.get(id=poll_id)

        close_poll(poll=poll)

        return Response(
            {"message": "Poll closed successfully"},
            status=status.HTTP_200_OK
        )