from rest_framework import serializers
from apps.issue_execution.models.contractor import Contractor


class ContractorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contractor
        fields = [
            "id",
            "reference_id",
            "name",
            "contact_person",
            "contact_phone",
            "contact_email",
            "specialization",
        ]