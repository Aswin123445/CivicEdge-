from datetime import date
from rest_framework import serializers


# ---------------------------------------------------------------------------
# Query param validation
# ---------------------------------------------------------------------------

SUPPORTED_RANGES = {"7d", "30d", "90d", "1y", "custom"}


class VolunteerArmyAnalyticsQuerySerializer(serializers.Serializer):
    range = serializers.ChoiceField(choices=list(SUPPORTED_RANGES), default="30d")
    date_from = serializers.DateField(required=False)
    date_to = serializers.DateField(required=False)

    def validate(self, attrs):
        range_param = attrs.get("range")
        date_from = attrs.get("date_from")
        date_to = attrs.get("date_to")

        if range_param == "custom":
            if not date_from or not date_to:
                raise serializers.ValidationError(
                    "Both date_from and date_to are required when range=custom."
                )
            if date_from > date_to:
                raise serializers.ValidationError(
                    "date_from must be before date_to."
                )
            if date_to > date.today():
                raise serializers.ValidationError(
                    "date_to cannot be in the future."
                )

        return attrs


# ---------------------------------------------------------------------------
# Response serializers (documentation / schema generation)
# ---------------------------------------------------------------------------

class KPIMetricSerializer(serializers.Serializer):
    value = serializers.IntegerField()
    change_percent = serializers.FloatField()


class KPIsSerializer(serializers.Serializer):
    total_groups = KPIMetricSerializer()
    total_members = KPIMetricSerializer()
    active_events = KPIMetricSerializer()
    event_participations = KPIMetricSerializer()
    restricted_members = KPIMetricSerializer()
    new_members_month = KPIMetricSerializer()


class GrowthDataPointSerializer(serializers.Serializer):
    month = serializers.CharField()
    joined = serializers.IntegerField()


class GroupAccessDistributionSerializer(serializers.Serializer):
    name = serializers.CharField()
    value = serializers.IntegerField()


class TopParticipationGroupSerializer(serializers.Serializer):
    group = serializers.CharField()
    participants = serializers.IntegerField()


class ConversionFunnelStageSerializer(serializers.Serializer):
    stage = serializers.CharField()
    count = serializers.IntegerField()


class VolunteerArmyAnalyticsDataSerializer(serializers.Serializer):
    kpis = KPIsSerializer()
    growth = GrowthDataPointSerializer(many=True)
    group_access_distribution = GroupAccessDistributionSerializer(many=True)
    top_participation_groups = TopParticipationGroupSerializer(many=True)
    conversion_funnel = ConversionFunnelStageSerializer(many=True)