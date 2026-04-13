from django.urls import path

from apps.forum.views.admin.admin_list_forum_reports_view import AdminListForumReportsAPIView
from apps.forum.views.admin.admin_retrieve_forum_report_view import AdminRetrieveForumReportAPIView
from apps.forum.views.admin.admin_report_action_view import AdminReportActionAPIView
from apps.forum.views.admin.admin_moderate_post_view import AdminModeratePostAPIView
from apps.forum.views.admin.admin_moderate_comment_view import AdminModerateCommentAPIView
from apps.forum.views.admin.admin_list_categories_view import AdminListCategoriesAPIView
from apps.forum.views.admin.create_category_view import CreateCategoryAPIView
from apps.forum.views.admin.toggle_category_view import ToggleCategoryAPIView
from apps.forum.views.admin.toggle_highlight_post_view import ToggleHighlightPostAPIView
from apps.forum.views.admin.admin_list_moderation_logs_view import AdminListModerationLogsAPIView 

urlpatterns = [
    path("reports/", AdminListForumReportsAPIView.as_view(), name="forum-reports"),
    path("reports/<uuid:id>/", AdminRetrieveForumReportAPIView.as_view(), name="forum-report-detail"),
    path("reports/<uuid:id>/action/", AdminReportActionAPIView.as_view(), name="forum-report-action"),
    path("posts/<uuid:id>/moderation/", AdminModeratePostAPIView.as_view(), name="moderate-post"),
    path("comments/<uuid:id>/moderation/", AdminModerateCommentAPIView.as_view(), name="moderate-comment"),
    path("categories/", AdminListCategoriesAPIView.as_view(), name="list-categories"),
    path("categories/create/",CreateCategoryAPIView.as_view(), name="create-category"),
    path("categories/<uuid:id>/toggle-status/",ToggleCategoryAPIView.as_view(), name="update-category"),
    path("posts/<uuid:id>/highlight-toggle/",ToggleHighlightPostAPIView.as_view(), name="toggle-highlight-post"),
    path("moderation-logs/", AdminListModerationLogsAPIView.as_view(), name="moderation-logs"),
]