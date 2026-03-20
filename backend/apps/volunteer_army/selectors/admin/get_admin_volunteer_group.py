from django.shortcuts import get_object_or_404

from apps.volunteer_army.models.volunteer_group import VolunteerGroup


def get_admin_volunteer_group(*, group_id):
    return get_object_or_404(VolunteerGroup.objects.select_related("created_by"), id=group_id)