from rest_framework import serializers
class AdministrativeDecisionSerializer(serializers.Serializer):
    type = serializers.CharField(source="decision_type")
    label = serializers.CharField()
    reason = serializers.CharField()
    created_at = serializers.DateTimeField()

    decided_by = serializers.SerializerMethodField()

    def get_decided_by(self, obj):
        return {
            "id": obj.decided_by.id,
            "name": obj.decided_by.get_full_name(),
        }
        
        
