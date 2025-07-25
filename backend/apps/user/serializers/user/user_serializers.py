from rest_framework import serializers
from apps.user.models.user import User, Profile
from apps.user.utils.location_validation import validate_location
from apps.user.utils.indian_phone_validator import indian_phone_validator
from apps.user.services.user_services import register_user
from apps.user.serializers.common.user_base_serializer import BaseUserSerializer

class ProfileBaseSerializer(serializers.ModelSerializer):
    """
    Base serializer for user profiles shared across roles.

    Fields:
        - id (UUID): Profile ID.
        - name (str): Full name of the user.
        - phone (str): Phone number (validated).
        - avatar_url (str): URL to the user's profile image.
    """

    class Meta:
        model = Profile
        fields = ['id', 'name', 'phone', 'avatar_url']

    def validate_phone(self, value):
        """
        Validates that the phone number is a valid Indian 10-digit number.

        Args:
            value (str): Phone number.

        Raises:
            serializers.ValidationError: If phone number is invalid.

        Returns:
            str: Validated phone number.
        """
        indian_phone_validator(value)
        return value


class CitizenProfileSerializer(ProfileBaseSerializer):
    """
    Serializer for citizen profiles.

    Inherits base profile fields and adds:
        - location (str): User's location (validated).
        - interests (list): Areas of interest.
        - zone (str): Administrative or geographical zone.
    """

    class Meta(ProfileBaseSerializer.Meta):
        fields = ProfileBaseSerializer.Meta.fields + ['location', 'interests', 'zone']

    def validate_location(self, value):
        """
        Validates the location string using custom logic.

        Args:
            value (str): Location value.

        Returns:
            str: Validated location.
        """
        return validate_location(value)


class SolverProfileSerializer(ProfileBaseSerializer):
    """
    Serializer for solver profiles.

    Adds:
        - skills (list): List of skills or expertise areas.
    """

    class Meta(ProfileBaseSerializer.Meta):
        fields = ProfileBaseSerializer.Meta.fields + ['skills']


class AdminProfileSerializer(ProfileBaseSerializer):
    """
    Serializer for admin profiles.

    Adds:
        - admin_zone_responsibility (str): Zone the admin is responsible for.
    """

    class Meta(ProfileBaseSerializer.Meta):
        fields = ProfileBaseSerializer.Meta.fields + ['admin_zone_responsibility']
