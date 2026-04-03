from rest_framework import serializers
from apps.volunteer_army.models.volunteer_event import VolunteerEvent


class CitizenVolunteerEventDetailSerializer(serializers.ModelSerializer):
    group_id = serializers.UUIDField(source="group.id", read_only=True)
    group_name = serializers.CharField(source="group.name", read_only=True)
    runtime_status = serializers.SerializerMethodField()

    participation_id = serializers.SerializerMethodField()
    participation_status = serializers.SerializerMethodField()
    selfie_url = serializers.SerializerMethodField()
    recognition_id = serializers.SerializerMethodField()
    filled_count = serializers.SerializerMethodField()

    class Meta:
        model = VolunteerEvent
        fields = [
            "id",
            "reference_id",
            "group_id",
            "group_name",
            "title",
            "description",
            "location_name",
            "location_address",
            "start_time",
            "end_time",
            "capacity",
            "runtime_status",
            "sponsor_name",
            "sponsor_website",
            "sponsor_message",

            "participation_id",
            "participation_status",
            "selfie_url",
            "recognition_id",
            "filled_count",
        ]

    def get_runtime_status(self, obj):
        return obj.get_runtime_status()

    def _get_participation(self, obj):
        if not hasattr(self, "_participation"):
            user = self.context["request"].user
            self._participation = obj.participations.filter(membership__user=user)\
                .select_related( "recognition")\
                .first()
        return self._participation

    def get_participation_id(self, obj):
        p = self._get_participation(obj)
        return p.id if p else None

    def get_participation_status(self, obj):
        p = self._get_participation(obj)
        return p.status if p else None

    def get_selfie_url(self, obj):
        p = self._get_participation(obj)
        if p and hasattr(p, "attendance_evidence_url"):
            return p.attendance_evidence_url
        return None

    def get_recognition_id(self, obj):
        p = self._get_participation(obj)
        if p and hasattr(p, "recognition"):
            return p.recognition.id
        return None
    def get_filled_count(self, obj):
        status = self.get_runtime_status(obj)
        if status == "COMPLETED" :
            return obj.participations.filter(status="VERIFIED").count()
        return obj.participations.filter(status="REGISTERED").count()