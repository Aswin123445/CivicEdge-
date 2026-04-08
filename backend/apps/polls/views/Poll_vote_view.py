from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from apps.user.permissions.user_permissions import IsCitizen
from apps.polls.serializers.poll_vote_serializer import PollVoteSerializer
from apps.polls.services.poll_vote_service import vote_on_poll
from apps.polls.utils.generate_insight import generate_insight

class PollVoteView(GenericAPIView):
    permission_classes = [IsCitizen]
    serializer_class = PollVoteSerializer
    lookup_url_kwarg = "poll_id"

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        result = vote_on_poll(
            user=request.user,
            poll_id=self.kwargs["poll_id"],
            option_id=serializer.validated_data["option_id"]
        )

        return Response({
            "message": (
                "Vote recorded"
                if not result["already_voted"]
                else "Already voted"
            ),
            "results": result["results"],
            "total_votes": result["total_votes"],
            "did_you_know": result["did_you_know"],
            "insight": generate_insight(result["results"]),
        }, status=status.HTTP_200_OK)