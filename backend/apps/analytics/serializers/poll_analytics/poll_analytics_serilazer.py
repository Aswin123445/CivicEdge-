from rest_framework import serializers


# ------------------------------------------------------------------ #
# KPI leaf
# ------------------------------------------------------------------ #

class KPIMetricSerializer(serializers.Serializer):
    value = serializers.FloatField()
    change_percent = serializers.FloatField()


class KPIsSerializer(serializers.Serializer):
    total_polls = KPIMetricSerializer()
    total_votes = KPIMetricSerializer()
    participation_rate = KPIMetricSerializer()
    avg_votes_per_poll = KPIMetricSerializer()


# ------------------------------------------------------------------ #
# Trend
# ------------------------------------------------------------------ #

class ParticipationTrendSerializer(serializers.Serializer):
    date = serializers.DateField()
    votes = serializers.IntegerField()
    voters = serializers.IntegerField()
    active_polls = serializers.IntegerField()


# ------------------------------------------------------------------ #
# Top polls
# ------------------------------------------------------------------ #

class TopPollSerializer(serializers.Serializer):
    id = serializers.CharField()
    title = serializers.CharField()
    votes = serializers.IntegerField()
    unique_participants = serializers.IntegerField()
    status = serializers.CharField()


# ------------------------------------------------------------------ #
# Root response
# ------------------------------------------------------------------ #

class PollAnalyticsSerializer(serializers.Serializer):
    kpis = KPIsSerializer()
    participation_trend = ParticipationTrendSerializer(many=True)
    top_polls = TopPollSerializer(many=True)