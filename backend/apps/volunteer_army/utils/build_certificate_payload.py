def build_certificate_payload(*, participation):
    user = participation.membership.user
    event = participation.event


    return {
        "participant_name": user.email,
        "event_name": event.title,
        "issue_date": participation.updated_at.date().strftime("%d %B %Y"),
        "event_date": event.start_time.strftime("%d %B %Y"),
        "reference_id": None,  # temporary, see note below
        "qr_verify_text": "Scan to Verify",
    }