from rest_framework import serializers

from apps.forum.models.forum_reaction import ReactionType


class ReactToForumPostSerializer(serializers.Serializer):
    reaction_type = serializers.ChoiceField(choices=ReactionType.choices)