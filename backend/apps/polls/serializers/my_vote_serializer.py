from rest_framework import serializers
from apps.polls.models import PollVote

class MyVoteSerializer(serializers.ModelSerializer):
    poll_id = serializers.UUIDField(source="poll.id")
    question = serializers.CharField(source="poll.question")
    expires_at = serializers.DateTimeField(source="poll.expires_at")

    selected_option = serializers.SerializerMethodField()
    is_expired = serializers.SerializerMethodField()
    total_vote = serializers.SerializerMethodField() 
    status = serializers.CharField(source="poll.effective_status")
    class Meta:
        model = PollVote
        fields = [
            "id",
            "poll_id",
            "reference_id",
            "question",
            "selected_option",
            "voted_at",
            "expires_at",
            "is_expired",
            "total_vote",
            "status",
        ]

    def get_selected_option(self, obj):
        return {
            "option_id": str(obj.option.id),
            "label": obj.option.option_text
        }
    def get_is_expired(self, obj):
        return obj.poll.is_expired

    def get_total_vote(self, obj):
        return obj.poll.votes.count()