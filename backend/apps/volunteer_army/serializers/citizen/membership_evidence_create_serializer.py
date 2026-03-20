from rest_framework import serializers
from apps.volunteer_army.models.membership_evidence import MembershipEvidence


class MembershipEvidenceCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = MembershipEvidence
        fields = [
            "file_url",
            "description",
        ]