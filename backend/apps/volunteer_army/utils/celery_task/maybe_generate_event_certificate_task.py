from celery import shared_task

from apps.volunteer_army.selectors.admin.get_participation_for_certificate import certificate_already_exists, get_participation_for_certificate, is_participation_eligible_for_certificate
from apps.volunteer_army.services.admin.issue_event_participation_certificate import issue_event_participation_certificate

@shared_task(bind=True, autoretry_for=(Exception,), retry_backoff=True, max_retries=3)
def maybe_generate_event_certificate_task(self, participation_id: str):
    participation = get_participation_for_certificate(participation_id=participation_id)

    if not participation:
        return

    if not is_participation_eligible_for_certificate(participation=participation):
        return

    if certificate_already_exists(participation=participation):
        return

    issue_event_participation_certificate(participation_id=participation.id)