from rest_framework import serializers


class DistributionItemSerializer(serializers.Serializer):
    option_id = serializers.UUIDField()
    label = serializers.CharField()
    value = serializers.IntegerField()
    percent = serializers.FloatField()


class PollDistributionSerializer(serializers.Serializer):
    poll_id = serializers.UUIDField()
    question = serializers.CharField()
    total_votes = serializers.IntegerField()
    distribution = DistributionItemSerializer(many=True)