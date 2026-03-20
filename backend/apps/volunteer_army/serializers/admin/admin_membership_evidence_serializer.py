from rest_framework import serializers

from apps.volunteer_army.models.membership_evidence import MembershipEvidence
from apps.volunteer_army.models.volunteer_membership import VolunteerMembership


class AdminMembershipEvidenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembershipEvidence
        fields = [
            "id",
            "file_url",
            "description",
            "uploaded_at",
        ]


class AdminVolunteerMembershipDetailSerializer(serializers.ModelSerializer):
    user_id = serializers.UUIDField(source="user.id", read_only=True)
    user_email = serializers.EmailField(source="user.email", read_only=True)

    group_id = serializers.UUIDField(source="group.id", read_only=True)
    group_name = serializers.CharField(source="group.name", read_only=True)
    group_description = serializers.CharField(source="group.description", read_only=True)
    membership_type = serializers.CharField(source="group.membership_type", read_only=True)
    risk_level = serializers.CharField(source="group.risk_level", read_only=True)
    requirements = serializers.CharField(source="group.requirements", read_only=True)

    evidences = AdminMembershipEvidenceSerializer(many=True, read_only=True)

    class Meta:
        model = VolunteerMembership
        fields = [
            "id",
            "status",
            "created_at",
            "updated_at",

            "user_id",
            "user_email",

            "group_id",
            "group_name",
            "group_description",
            "membership_type",
            "risk_level",
            "requirements",

            "evidences",
        ]