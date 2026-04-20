from apps.user.models.user import Zone


def get_zones(*, is_active=None):
    queryset = Zone.objects.all()

    if is_active is not None:
        queryset = queryset.filter(is_active=is_active)

    return queryset.order_by("name")