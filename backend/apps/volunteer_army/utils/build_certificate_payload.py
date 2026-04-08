from django.conf import settings

def build_certificate_payload(*, participation, recognition):
    user = participation.membership.user
    event = participation.event
    return {
        "participant_name": user.profile.name or user.email.split("@")[0],
        "event_name": event.title,
        "issue_date": participation.updated_at.date().strftime("%d %B %Y"),
        "event_date": event.start_time.strftime("%d %B %Y"),
        "reference_id": recognition.reference_id,
        "qr_verify_text": "Scan to Verify",
        "verification_url": f"{settings.FRONTEND_URL}/volunteer-army/certificate/{recognition.id}/verify",
    }