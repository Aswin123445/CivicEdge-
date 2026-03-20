def mark_event_participation_no_show(*, participation, by):
    participation.mark_no_show(by=by)
    return participation