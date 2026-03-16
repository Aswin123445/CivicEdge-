from rest_framework.generics import ListAPIView

from apps.issue_execution.selectors.contractor_selectors import get_active_contractors
from apps.issue_execution.serilalizers.contractor_serializers import ContractorListSerializer

class ContractorListAPIView(ListAPIView):
    serializer_class = ContractorListSerializer

    def get_queryset(self):
        return get_active_contractors()