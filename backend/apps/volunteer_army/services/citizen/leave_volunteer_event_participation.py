def leave_volunteer_event_participation(*, participation, by):
    participation.leave(by=by)
    return participation