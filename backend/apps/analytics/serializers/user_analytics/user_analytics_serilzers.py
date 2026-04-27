import datetime

from rest_framework import serializers




class FilterSerializer(serializers.Serializer):
    range = serializers.CharField()
    date_from = serializers.DateField(allow_null=True)
    date_to = serializers.DateField(allow_null=True)




# ══════════════════════════════════════════════
# User Analytics serializers
# ══════════════════════════════════════════════

VALID_RANGES = ["7d", "30d", "90d", "1y", "custom"]


class UserAnalyticsFilterSerializer(serializers.Serializer):
    """
    Validates incoming query params for the user analytics endpoint.
    This is the only place date/range validation lives.
    """
    range = serializers.ChoiceField(choices=VALID_RANGES, default="30d")
    date_from = serializers.DateField(required=False, allow_null=True)
    date_to = serializers.DateField(required=False, allow_null=True)

    def validate(self, data):
        today = datetime.date.today()

        if data.get("range") == "custom":
            if not data.get("date_from") or not data.get("date_to"):
                raise serializers.ValidationError(
                    "date_from and date_to are required when range=custom."
                )
            if data["date_from"] > data["date_to"]:
                raise serializers.ValidationError(
                    "date_from must not be after date_to."
                )
            if data["date_to"] > today:
                raise serializers.ValidationError(
                    "date_to cannot be a future date."
                )

        return data


# ── Stats ─────────────────────────────────────

class UserStatsSerializer(serializers.Serializer):
    total_users = serializers.IntegerField()
    new_users_this_month = serializers.IntegerField()
    active_users = serializers.IntegerField()
    citizens = serializers.IntegerField()
    solvers = serializers.IntegerField()
    admins = serializers.IntegerField()


# ── Distribution pie ──────────────────────────

class UserDistributionPointSerializer(serializers.Serializer):
    name = serializers.CharField()   # "Citizen" | "Solver" | "Admin"
    value = serializers.IntegerField()


# ── Growth chart ──────────────────────────────

class UserGrowthPointSerializer(serializers.Serializer):
    date = serializers.CharField()   # e.g. "Apr 01", "Week 14", "Apr 2026"
    users = serializers.IntegerField()


# ── Zone solver chart ─────────────────────────

class ZoneSolverPointSerializer(serializers.Serializer):
    zone = serializers.CharField()   # zone name  → <BarChart> x-axis
    solvers = serializers.IntegerField()
    active_solvers = serializers.IntegerField()  # extra bar / stacked
    
class SolverPerformanceSeralizer(serializers.Serializer):
    id = serializers.UUIDField()  # zone name  → <BarChart> x-axis
    name = serializers.CharField()
    resolved = serializers.IntegerField()


# ── Root response ─────────────────────────────

class UserAnalyticsDashboardSerializer(serializers.Serializer):
    stats = UserStatsSerializer()
    distribution = UserDistributionPointSerializer(many=True)
    growth = UserGrowthPointSerializer(many=True)
    zone_solver_chart = ZoneSolverPointSerializer(many=True)
    top_solver_performance = SolverPerformanceSeralizer(many=True)