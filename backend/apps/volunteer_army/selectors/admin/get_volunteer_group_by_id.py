from django.shortcuts import get_object_or_404
from apps.volunteer_army.models.volunteer_group import VolunteerGroup


def get_volunteer_group_by_id(group_id):
    return get_object_or_404(VolunteerGroup, id=group_id)