from apps.volunteer_army.models.volunteer_recognition import VolunteerRecognition


def list_user_volunteer_recognitions(*, user):
    return (
        VolunteerRecognition.objects.select_related(
            "participation",
            "participation__event",
            "participation__event__group",
            "participation__membership",
            "participation__membership__user",
            "issued_by",
        )
        .filter(participation__membership__user=user)
        .order_by("-issued_at")
    )