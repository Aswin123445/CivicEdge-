from rest_framework.generics import ListAPIView
from django.utils.timezone import now

from apps.polls.selectors.get_user_votes import get_user_votes
from apps.polls.serializers.my_vote_serializer import MyVoteSerializer
from apps.user.permissions.user_permissions import IsCitizen
from apps.polls.models.polls import Status


class MyVotesView(ListAPIView):
    permission_classes = [IsCitizen]
    serializer_class = MyVoteSerializer
    search_fields = [
        "reference_id",
        "poll__reference_id",
        "poll__question",
        "poll__context",
    ]
    ordering_fields = [
        "voted_at",
    ]
    ordering = ["-voted_at"]
    def get_queryset(self):
        return get_user_votes(user=self.request.user)
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        active_polls = queryset.filter(poll__expires_at__gte=now(), poll__status = Status.ACTIVE).count()
        closed_polls = queryset.all().count() - active_polls
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response =  self.get_paginated_response(serializer.data)
            response.data["active_polls"] = active_polls 
            response.data["closed_polls"] = closed_polls
            return response
            

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)