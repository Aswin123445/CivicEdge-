from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.issue_execution.selectors.solver_field_verification_draft_selector import get_field_verification_draft
from apps.issue_execution.serilalizers.solver_verification_detail import SolverVerificationDraftReportDetailSerializer



class SolverVerificationReportDetailAPIView(APIView):

    def get(self, request, draft_id):

        draft = get_field_verification_draft(draft_id)

        serializer = SolverVerificationDraftReportDetailSerializer(draft)

        return Response(serializer.data, status=status.HTTP_200_OK)