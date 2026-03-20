def archive_volunteer_group(*, group, by):

    group.archive(by=by)

    return group