from django.urls import path

from apps.analytics.views.issue_analytics.issue_dashboard_view import IssueDashboardView
from apps.analytics.views.issue_analytics.issue_export_view import IssueDashboardExportView
from apps.analytics.views.user_analytics.user_analytics_views import UserAnalyticsView
from apps.analytics.views.user_analytics.user_export_views import UserDashboardExportView
from apps.analytics.views.volunteer_analytics.volunteer_analytics_view import VolunteerArmyAnalyticsView
from apps.analytics.views.volunteer_analytics.volunteer_analytics_export_view import VolunteerDashboardExportView
from apps.analytics.views.poll_analytics.poll_analytics_views import PollAnalyticsView
from apps.analytics.views.poll_analytics.poll_analytics_export_view import PollDashboardExportView
from apps.analytics.views.forum_analytics.forum_analytics_view import ForumAnalyticsView
from apps.analytics.views.forum_analytics.forum_analytics_export import ForumAnalyticsExportView


urlpatterns = [
    path("issues-dashboard/",IssueDashboardView.as_view(),name="issues-dashboard"),
    path("issues-export/",IssueDashboardExportView.as_view(),name="issues-export"),
    path("users-dashboard/",UserAnalyticsView.as_view(),name="users-dashboard"),
    path("users-export/",UserDashboardExportView.as_view(),name="users-export"),
    path("volunteer-dashboard/",VolunteerArmyAnalyticsView.as_view(),name="volunteer-dashboard"),
    path("volunteer-export/",VolunteerDashboardExportView.as_view(),name="volunteer-export"),
    path("poll-dashboard/",PollAnalyticsView.as_view(),name="poll-dashboard"),
    path("poll-export/",PollDashboardExportView.as_view(),name="poll-export"),
    path("forum-dashboard/",ForumAnalyticsView.as_view(),name="forum-dashboard"),
    path("forum-export/",ForumAnalyticsExportView.as_view(),name="forum-export"),
]

