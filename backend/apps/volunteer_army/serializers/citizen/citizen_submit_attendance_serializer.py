from rest_framework import serializers


class CitizenSubmitAttendanceSerializer(serializers.Serializer):
    attendance_evidence_url = serializers.URLField()