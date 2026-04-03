from rest_framework import serializers

from apps.volunteer_army.models.volunteer_group import MembershipType


class QuickActionsSerializer(serializers.Serializer):
    memberships_count    = serializers.IntegerField()
    participations_count = serializers.IntegerField()
    recognitions_count   = serializers.IntegerField()


class FeaturedGroupSerializer(serializers.Serializer):
    id      = serializers.UUIDField()
    name    = serializers.CharField()
    members = serializers.IntegerField(source="member_count")
    status  = serializers.SerializerMethodField()
    desc    = serializers.CharField(source="description")

    def get_status(self, obj) -> str:
        """
        OPEN              → "OPEN"
        APPROVAL_REQUIRED → "RESTRICTED"
        """
        if obj.membership_type == MembershipType.OPEN:
            return "OPEN"
        return "RESTRICTED"


class UpcomingEventSerializer(serializers.Serializer):
    id    = serializers.UUIDField()
    title = serializers.CharField(source="event.title")
    date  = serializers.DateTimeField(source="event.start_time", format="%b %d, %Y")
    group = serializers.CharField(source="event.group.name")
    event_id = serializers.UUIDField(source="event.id") 
    group_id = serializers.UUIDField(source="event.group.id")


class CitizenHomePageSerializer(serializers.Serializer):
    quick_actions   = QuickActionsSerializer()
    featured_groups = FeaturedGroupSerializer(many=True)
    upcoming_events = UpcomingEventSerializer(many=True)