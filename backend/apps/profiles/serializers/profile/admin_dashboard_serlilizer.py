from rest_framework import serializers


class IssueMetricsSerializer(serializers.Serializer):
    total = serializers.IntegerField()
    open = serializers.IntegerField()
    resolved = serializers.IntegerField()


class TaskMetricsSerializer(serializers.Serializer):
    total = serializers.IntegerField()
    completed = serializers.IntegerField()


class SolverMetricsSerializer(serializers.Serializer):
    total = serializers.IntegerField()
    active = serializers.IntegerField()


class FlagMetricsSerializer(serializers.Serializer):
    total = serializers.IntegerField()
    pending = serializers.IntegerField()


class EventMetricsSerializer(serializers.Serializer):
    total = serializers.IntegerField()
    active = serializers.IntegerField()
    
    
class IssueTrendItemSerializer(serializers.Serializer):
    date = serializers.DateField()
    count = serializers.IntegerField()
    
class AdminMetricsSerializer(serializers.Serializer):
    tasks_approved = serializers.IntegerField()
    events_created = serializers.IntegerField()
    groups_created = serializers.IntegerField()
    polls_created = serializers.IntegerField()


class DashboardMetricsSerializer(serializers.Serializer):
    issues = IssueMetricsSerializer()
    tasks = TaskMetricsSerializer()
    solvers = SolverMetricsSerializer()
    flags = FlagMetricsSerializer()
    events = EventMetricsSerializer()
    issues_last_7_days=IssueTrendItemSerializer(many=True)
    users_joined_7_days = IssueTrendItemSerializer(many=True)
    posts_last_7_days = IssueTrendItemSerializer(many=True)
    admin = AdminMetricsSerializer()
    