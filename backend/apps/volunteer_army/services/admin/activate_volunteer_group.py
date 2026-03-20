
def activate_volunteer_group(*, group, by):
    group.activate(by=by)
    return group