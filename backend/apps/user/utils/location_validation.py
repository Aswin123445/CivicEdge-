from apps.user import serializers

def validate_location(value):
    if not value.replace(" ", "").isalpha():
        raise serializers.ValidationError("Location must only contain letters and spaces.")
    if len(value.strip()) < 3:
        raise serializers.ValidationError("Location must be at least 3 characters long.")
    return value
