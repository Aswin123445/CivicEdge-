from rest_framework import serializers


class AdminReportActionSerializer(serializers.Serializer):
    action = serializers.ChoiceField(choices=[
        "hide",
        "remove",
        "restore",
        "reject",
    ])
    reason = serializers.CharField(required=False, allow_blank=True)