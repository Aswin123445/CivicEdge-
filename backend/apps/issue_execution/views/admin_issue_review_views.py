from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsAdmin

from apps.issue_execution.selectors.admin_issue_selectors import get_issues_pending_initial_review
from apps.issue_execution.serilalizers.admin_issue_review_serializer import AdminIssueReviewSerializer

from rest_framework.response import Response
from django.utils.timezone import now


class AdminInitialIssueReviewListView(ListAPIView):
    """
    Lists issues that require initial admin review.
    """
    permission_classes = [IsAdmin]
    serializer_class = AdminIssueReviewSerializer
    search_fields = [
        "reference_id",
        "title",
        "location__zone__name",
        "category__name",
    ]
    filterset_fields = [
        "category__reference_id",
    ]
    

    def get_queryset(self):
        return get_issues_pending_initial_review()
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        
        today = now().date()
        today_count =  queryset.filter(created_at__date=today).count()
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response =  self.get_paginated_response(serializer.data)
            response.data['today_count'] = today_count
            return response

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'today_count': today_count,
            'results': serializer.data
        })