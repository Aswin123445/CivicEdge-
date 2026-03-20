from apps.volunteer_army.models.volunteer_group import VolunteerGroup, VolunteerGroupStatus


def create_volunteer_group(*, data, created_by):
    """
    Creates a volunteer group in DRAFT state.
    """

    group = VolunteerGroup.objects.create(
        **data,
        status=VolunteerGroupStatus.DRAFT,
        created_by=created_by,
    )

    return group