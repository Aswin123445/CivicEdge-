from rest_framework import serializers


class MarkReadBulkSerializer(serializers.Serializer):
    ids = serializers.ListField(
        child=serializers.UUIDField(),
        allow_empty=False
    )

    def validate_ids(self, value):
        # Remove duplicates
        unique_ids = list(set(value))

        # Optional: limit size (protect DB)
        if len(unique_ids) > 100:
            raise serializers.ValidationError("Maximum 100 notifications allowed per request.")

        return unique_ids