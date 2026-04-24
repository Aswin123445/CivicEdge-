from django.urls import path

from apps.analytics.views.issue_analytics.issue_dashboard_view import IssueDashboardView
from apps.analytics.views.issue_analytics.issue_export_view import IssueDashboardExportView
from apps.analytics.views.user_analytics.user_analytics_views import UserAnalyticsView
from apps.analytics.views.user_analytics.user_export_views import UserDashboardExportView


urlpatterns = [
    path("issues-dashboard/",IssueDashboardView.as_view(),name="issues-dashboard"),
    path("issues-export/",IssueDashboardExportView.as_view(),name="issues-export"),
    path("users-dashboard/",UserAnalyticsView.as_view(),name="users-dashboard"),
    path("users-export/",UserDashboardExportView.as_view(),name="users-export"),
]

