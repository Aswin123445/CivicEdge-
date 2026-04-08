from rest_framework import serializers


class HomePollItemSerializer(serializers.Serializer):
    id = serializers.UUIDField()
    question = serializers.CharField()
    description = serializers.CharField()
    votes = serializers.IntegerField()
    leading_percent = serializers.FloatField()
    timeLeft = serializers.CharField(allow_null=True)
    status = serializers.CharField()


class HomePollSerializer(serializers.Serializer):
    total_system_votes = serializers.IntegerField()
    polls = HomePollItemSerializer(many=True)
    total_active_polls = serializers.IntegerField()