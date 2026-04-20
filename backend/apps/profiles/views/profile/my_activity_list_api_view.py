from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

from apps.profiles.serializers.profile.activity_feed_serializer import ActivityFeedSerializer
from apps.profiles.selectors.profile.activity_selector import get_activity_analytics, get_user_activity


class MyActivityListAPIView(ListAPIView):
    serializer_class = ActivityFeedSerializer
    permission_classes = [IsAuthenticated]
    search_fields = [
        "message",
        "entity",
        "action",
    ]
    filterset_fields = [
        "entity",
        'action',
    ]
    ordering_fields = [
        "created_at",
    ]
    ordering = ["-created_at"]
    def get_queryset(self):
        user = self.request.user
        queryset = get_user_activity(
            user=user
        )
        return queryset
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        analytics = get_activity_analytics(queryset)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            paginated_response = self.get_paginated_response(serializer.data)

            # inject analytics into response
            paginated_response.data["analytics"] = analytics
            return paginated_response

        serializer = self.get_serializer(queryset, many=True)
        return Response({
            "results": serializer.data,
            "analytics": analytics
        })
