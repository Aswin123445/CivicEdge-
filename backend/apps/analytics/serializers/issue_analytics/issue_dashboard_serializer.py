from rest_framework import serializers


# ──────────────────────────────────────────────
# Sub-serializers (protect individual chart shapes)
# ──────────────────────────────────────────────

class FilterSerializer(serializers.Serializer):
    range = serializers.CharField()
    date_from = serializers.DateField(allow_null=True)
    date_to = serializers.DateField(allow_null=True)


class StatsSerializer(serializers.Serializer):
    total_issues = serializers.IntegerField()
    resolved_issues = serializers.IntegerField()
    pending_issues = serializers.IntegerField()
    rejected_issues = serializers.IntegerField()


class TrendPointSerializer(serializers.Serializer):
    label = serializers.CharField()
    reported = serializers.IntegerField()
    resolved = serializers.IntegerField()


class FunnelStageSerializer(serializers.Serializer):
    stage = serializers.CharField()
    count = serializers.IntegerField()


class ZonePointSerializer(serializers.Serializer):
    zone = serializers.CharField()
    issues = serializers.IntegerField()


class CategoryPointSerializer(serializers.Serializer):
    name = serializers.CharField()
    value = serializers.IntegerField()


# ──────────────────────────────────────────────
# Root dashboard serializer
# ──────────────────────────────────────────────

class IssueDashboardSerializer(serializers.Serializer):
    filters = FilterSerializer()
    stats = StatsSerializer()
    trend_chart = TrendPointSerializer(many=True)
    funnel_chart = FunnelStageSerializer(many=True)
    zone_chart = ZonePointSerializer(many=True)
    category_chart = CategoryPointSerializer(many=True)