from django.urls import path

from apps.polls.views.admin_poll_views import AdminPollListView
from apps.polls.views.admin_poll_view import AdminCreatePollView
from apps.polls.views.admin_poll_details_view import AdminPollDetailView
from apps.polls.views.admin_close_poll_view import AdminClosePollView
from apps.polls.views.admin_poll_distrubution_views import PollDistributionView
from apps.polls.views.admin_poll_timeline_views import PollTimelineView
urlpatterns = [ 
    path("polls/", AdminPollListView.as_view(), name="admin-poll-list"),
    path("polls/create/", AdminCreatePollView.as_view(), name="admin-create-poll"),
    path("polls/<uuid:poll_id>/", AdminPollDetailView.as_view(), name="admin-poll-detail"),
    path("polls/<uuid:poll_id>/close/", AdminClosePollView.as_view(), name="admin-close-poll"),
    path("polls/<uuid:poll_id>/distribution/", PollDistributionView.as_view(), name="admin-poll-distribution"),
    path("polls/<uuid:poll_id>/timeline/", PollTimelineView.as_view(), name="admin-poll-timeline"),
]