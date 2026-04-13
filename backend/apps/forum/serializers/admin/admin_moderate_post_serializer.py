from rest_framework import serializers


class AdminModeratePostSerializer(serializers.Serializer):
    action = serializers.ChoiceField(choices=[
        "hide",
        "remove",
        "restore",
    ])
    reason = serializers.CharField(required=False, allow_blank=True)