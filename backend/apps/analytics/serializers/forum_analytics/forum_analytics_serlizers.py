from rest_framework import serializers


class KPIItemSerializer(serializers.Serializer):
    key = serializers.CharField()
    label = serializers.CharField()
    value = serializers.FloatField()
    change_percent = serializers.FloatField()
    isPositive = serializers.BooleanField()


class ForumActivityTrendSerializer(serializers.Serializer):
    date = serializers.CharField()   # "Apr 1" — pre-formatted in selector
    posts = serializers.IntegerField()
    comments = serializers.IntegerField()


class TopDiscussionCategorySerializer(serializers.Serializer):
    name = serializers.CharField()
    count = serializers.IntegerField()


class ForumAnalyticsSerializer(serializers.Serializer):
    kpis = KPIItemSerializer(many=True)
    forum_activity_trend = ForumActivityTrendSerializer(many=True)
    top_discussion_categories = TopDiscussionCategorySerializer(many=True)