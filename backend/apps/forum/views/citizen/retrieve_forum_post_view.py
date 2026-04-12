from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound

from apps.forum.selectors.citizen.get_forum_post_detail_selector import get_forum_post_detail
from apps.forum.selectors.citizen.get_post_reaction_summary_selector import get_post_reaction_summary
from apps.forum.selectors.citizen.get_user_post_reaction_selector import get_user_post_reaction
from apps.forum.serializers.citizen.forum_post_detail_serializer import ForumPostDetailSerializer
from apps.user.permissions.user_permissions import IsCitizen

class RetrieveForumPostAPIView(RetrieveAPIView):
    serializer_class = ForumPostDetailSerializer
    permission_classes = [IsCitizen]
    lookup_field = "id"

    def retrieve(self, request, *args, **kwargs):
        post_id = kwargs.get("id")

        post = get_forum_post_detail(post_id=post_id)

        if not post:
            raise NotFound("Post not found")

        # reaction summary
        reaction_data = get_post_reaction_summary(post_id=post_id)
        reaction_summary = {
            item["reaction_type"]: item["count"]
            for item in reaction_data
        }

        # user reaction
        user_reaction = None
        if request.user.is_authenticated:
            user_reaction = get_user_post_reaction(
                user=request.user,
                post_id=post_id,
            )

        serializer = self.get_serializer({
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "category": post.category,
            "media": post.media.all(),
            "created_at": post.created_at,
            "comments_count": post.comments_count,
            "reaction_summary": reaction_summary,
            "user_reaction": user_reaction,
        })

        return Response(serializer.data)