from rest_framework import serializers

from apps.issues.models.behavioral_prompt import BehavioralPrompt

class BehavioralPromptListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = BehavioralPrompt
        fields = [
            "id",
            "reference_id",
            "question_text",
            "response_type",
            "options",
            "category",
            "category_name",
            "display_order",
            "is_active",
        ]
        
class BehavioralPromptCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BehavioralPrompt
        fields = [
            "question_text",
            "response_type",
            "options",
            "category",
            "display_order",
        ]

    def validate(self, data):
        response_type = data.get("response_type")
        options = data.get("options")

        if response_type == "MULTIPLE_CHOICE" and not options:
            raise serializers.ValidationError({
                "options": "Options required for multiple choice"
            })

        if response_type == "SCALE" and not options:
            raise serializers.ValidationError({
                "options": "Scale options required"
            })

        return data
    
    
# POST /dashboard/prompts/

# {
#   "question_text": "What type of road damage?",
#   "response_type": "MULTIPLE_CHOICE",
#   "options": ["Pothole", "Crack", "Waterlogging"],
#   "category": "bf1d120a-15a4-45e2-a318-d4394aedd5cc",
#   "display_order": 2
# }


# {
#   "question_text": "Is the issue urgent?",
#   "response_type": "YES_NO",
#   "options": null,
#   "category": null,
#   "display_order": 1
# }