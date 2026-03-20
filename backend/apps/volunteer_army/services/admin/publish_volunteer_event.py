def publish_volunteer_event(*, event, by):
    event.publish(by=by)
    return event