from rest_framework.generics import ListAPIView
from apps.user.permissions.user_permissions import IsAdmin
from apps.user.permissions.is_active_solver_for_write import IsActiveSolverForWrite
from apps.issue_execution.selectors.admin_verification_report_selectors import (
    get_postponed_pending_verification_reports,
)
from apps.issue_execution.serilalizers.admin_verification_report_list_serializer import (
    AdminVerificationReportListSerializer,
)
from django.utils.timezone import now
from rest_framework.response import Response


class AdminPostponedVerificationReportListView(ListAPIView):
    permission_classes = [IsAdmin, IsActiveSolverForWrite]
    serializer_class = AdminVerificationReportListSerializer
    search_fields = [
        "reference_id",
        "solver_task__issue__title",
    ]

    def get_queryset(self):
        status = self.request.query_params.get("status")
        if status == "PENDING":
            return get_postponed_pending_verification_reports()
        # Future extension (DECIDED, ALL)
        return get_postponed_pending_verification_reports()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)

        today = now().date()
        today_count = queryset.filter(created_at__date=today).count()
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response = self.get_paginated_response(serializer.data)
            response.data["today_count"] = today_count
            return response

        serializer = self.get_serializer(queryset, many=True)
        return Response({"today_count": today_count, "results": serializer.data})
