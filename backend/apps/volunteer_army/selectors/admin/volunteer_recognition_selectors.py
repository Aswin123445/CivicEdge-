from apps.volunteer_army.models.volunteer_recognition import VolunteerRecognition


def list_admin_volunteer_recognitions():
    return (
        VolunteerRecognition.objects.select_related(
            "participation",
            "participation__event",
            "participation__event__group",
            "participation__membership",
            "participation__membership__user",
            "issued_by",
        )
        .order_by("-issued_at")
    )