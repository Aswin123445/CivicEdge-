def reject_volunteer_membership(*, membership, by):
    membership.reject(by=by)
    return membership
