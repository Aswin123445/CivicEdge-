from rest_framework import serializers


class PollVoteSerializer(serializers.Serializer):
    option_id = serializers.UUIDField()