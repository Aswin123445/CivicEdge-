def cancel_volunteer_event(*, event, by):
    event.cancel(by=by)
    return event