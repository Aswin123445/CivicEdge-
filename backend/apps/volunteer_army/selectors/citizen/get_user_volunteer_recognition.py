from django.shortcuts import get_object_or_404

from apps.volunteer_army.models.volunteer_recognition import VolunteerRecognition


def get_user_volunteer_recognition(*, recognition_id, user):
    return get_object_or_404(
        VolunteerRecognition.objects.select_related(
            "participation",
            "participation__event",
            "participation__event__group",
            "participation__membership",
            "participation__membership__user",
            "issued_by",
        ),
        id=recognition_id,
        participation__membership__user=user,
    )