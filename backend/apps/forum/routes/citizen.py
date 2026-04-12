from django.urls import path

from apps.forum.views.citizen.create_forum_post_view import CreateForumPostAPIView
from apps.forum.views.citizen.list_forum_posts_view import ListForumPostsAPIView
from apps.forum.views.citizen.retrieve_forum_post_view import RetrieveForumPostAPIView
from apps.forum.views.citizen.update_forum_post_view import UpdateForumPostAPIView
from apps.forum.views.citizen.delete_forum_post_view import DeleteForumPostAPIView
from apps.forum.views.citizen.create_forum_comment_view import CreateForumCommentAPIView
from apps.forum.views.citizen.list_forum_comments_view import ListForumCommentsAPIView
from apps.forum.views.citizen.update_forum_comment_view import UpdateForumCommentAPIView
from apps.forum.views.citizen.delete_forum_comment_view import DeleteForumCommentAPIView
from apps.forum.views.citizen.react_to_forum_post_view import ReactToForumPostAPIView
from apps.forum.views.citizen.create_forum_report_view import CreateForumReportAPIView
from apps.forum.views.citizen.list_categories_view import ListCategoriesAPIView

urlpatterns = [
    path("posts-create/", CreateForumPostAPIView.as_view(), name="create-post"),
    path("posts-list/", ListForumPostsAPIView.as_view(), name="list-posts"),
    path("posts-list/<uuid:id>/", RetrieveForumPostAPIView.as_view(), name="post-detail"),
    path("posts-list/<uuid:id>/update/", UpdateForumPostAPIView.as_view(), name="update-post"),
    path("posts-list/<uuid:id>/delete/", DeleteForumPostAPIView.as_view(), name="delete-post"),
    path("posts-list/<uuid:post_id>/comments-create/", CreateForumCommentAPIView.as_view(), name="post-comments"),
    path("posts-list/<uuid:post_id>/comments-list/", ListForumCommentsAPIView.as_view(), name="list-comment"),
    path("comments-list/<uuid:id>/update", UpdateForumCommentAPIView.as_view(), name="comment-update"),
    path("comments-list/<uuid:id>/delete/", DeleteForumCommentAPIView.as_view(), name="comment-delete"),
    path("posts-list/<uuid:post_id>/react/", ReactToForumPostAPIView.as_view(), name="post-react"),
    path("reports/", CreateForumReportAPIView.as_view(), name="create-report"),
    path("categories/", ListCategoriesAPIView.as_view(), name="list-categories"),
]