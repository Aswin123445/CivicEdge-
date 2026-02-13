from rest_framework import serializers
def interest_validator(value):
    if len(value) > 10:
        raise serializers.ValidationError(
            "You can add a maximum of 10 interests."
        )

    cleaned = []
    for interest in value:
        interest = interest.strip()
        if not interest:
            raise serializers.ValidationError(
                "Interests cannot be empty."
            )
        cleaned.append(interest.lower())

    return cleaned
