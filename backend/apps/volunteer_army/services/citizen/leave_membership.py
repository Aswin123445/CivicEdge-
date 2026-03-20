def leave_membership(*, membership, user):

    membership.leave(by=user)

    return membership