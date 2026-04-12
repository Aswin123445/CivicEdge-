from rest_framework.generics import ListAPIView

from apps.forum.selectors.citizen.get_forum_comments_selector import get_forum_comments
from apps.forum.serializers.citizen.forum_comment_list_serializer import ForumCommentListSerializer
from apps.forum.utils.forum_comment_pagination import ForumCommentPagination
from apps.user.permissions.user_permissions import IsCitizen




class ListForumCommentsAPIView(ListAPIView):
    serializer_class = ForumCommentListSerializer
    pagination_class = ForumCommentPagination
    permission_classes = [IsCitizen]

    def get_queryset(self):
        post_id = self.kwargs.get("post_id")
        return get_forum_comments(post_id=post_id)