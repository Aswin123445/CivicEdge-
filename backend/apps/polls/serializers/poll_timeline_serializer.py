from rest_framework import serializers


class TimelineItemSerializer(serializers.Serializer):
    time = serializers.DateTimeField()
    votes = serializers.IntegerField()


class PollTimelineSerializer(serializers.Serializer):
    poll_id = serializers.UUIDField()
    question = serializers.CharField()
    timeline = TimelineItemSerializer(many=True)