from rest_framework import serializers


class CloudinaryEvidenceSerializer(serializers.Serializer):
    public_id = serializers.CharField()
    secure_url = serializers.URLField()
    resource_type = serializers.ChoiceField(
        choices=["image", "video"]
    )
    format = serializers.CharField(required=False, allow_blank=True)
    width = serializers.IntegerField(required=False)
    height = serializers.IntegerField(required=False)
    bytes = serializers.IntegerField(required=False)


class VerificationEvidenceBulkCreateSerializer(serializers.Serializer):
    evidences = CloudinaryEvidenceSerializer(many=True)

    def validate_evidences(self, value):
        if not value:
            raise serializers.ValidationError(
                "At least one evidence item is required."
            )
        return value