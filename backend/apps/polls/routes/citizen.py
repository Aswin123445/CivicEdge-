from django.urls import path

from apps.polls.views.poll_views import PollListView
from apps.polls.views.poll_detail_views import PollDetailView
from apps.polls.views.Poll_vote_view import PollVoteView
from apps.polls.views.my_poll_views import MyVotesView
from apps.polls.views.home_poll_view import HomePollView 


urlpatterns = [
    path('active-polls/',PollListView.as_view(),name='active-polls'),
    path("active-polls/<uuid:poll_id>/", PollDetailView.as_view(), name="poll-detail"),
    path("active-polls/<uuid:poll_id>/vote/", PollVoteView.as_view(), name="poll-vote"),
    path("my-votes/", MyVotesView.as_view(), name="my-votes"),
    path("home/", HomePollView.as_view(), name="home-polls"),
]