def reject_attendance_submission(*, participation, by):
    participation.reject(by=by)
    return participation

