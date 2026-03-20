def submit_membership_for_review(*, membership, user):
    membership.submit_for_review(by=user)
    return membership