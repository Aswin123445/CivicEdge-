from rest_framework.generics import ListAPIView

from apps.polls.selectors.get_admin_polls import get_admin_polls
from apps.polls.serializers.admin_poll_serializer import AdminPollListSerializer
from apps.user.permissions.user_permissions import IsAdmin
from apps.polls.models.polls import Status
from django.db import models
from django.utils.timezone import now
class AdminPollListView(ListAPIView):
    permission_classes = [IsAdmin]
    serializer_class = AdminPollListSerializer
    search_fields = [
        "reference_id",
        "question",
    ]
    ordering_fields = [
        "created_at",
    ]
    ordering = ["-created_at"]
    def get_queryset(self):
        status = self.request.query_params.get("status") 
        return get_admin_polls(status)
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        active_count = queryset.filter(status=Status.ACTIVE,expires_at__gte=now()).count() 
        closed_count = queryset.filter(models.Q(status=Status.CLOSED) | models.Q(expires_at__lte=now())).count()
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response =  self.get_paginated_response(serializer.data)
            response.data['active_count'] = active_count 
            response.data['closed_count'] = closed_count
            return response