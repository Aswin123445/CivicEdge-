def approve_volunteer_membership(*, membership, by):
    membership.approve(by=by)
    return membership