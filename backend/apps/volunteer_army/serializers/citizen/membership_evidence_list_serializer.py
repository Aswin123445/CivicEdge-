from rest_framework import serializers
from apps.volunteer_army.models.membership_evidence import MembershipEvidence


class MembershipEvidenceListSerializer(serializers.ModelSerializer):

    class Meta:
        model = MembershipEvidence
        fields = [
            "reference_id",
            "id",
            "file_url",
            "description",
            "uploaded_at",
        ]