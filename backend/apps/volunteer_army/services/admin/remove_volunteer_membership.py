def remove_volunteer_membership(*, membership, by):
    membership.remove(by=by)
    return membership