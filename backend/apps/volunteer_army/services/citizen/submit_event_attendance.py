def submit_event_attendance(*, participation, evidence_url, by):
    participation.submit_attendance(
        evidence_url=evidence_url,
        by=by,
    )
    return participation