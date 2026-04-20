# tasks.py

from celery import shared_task

from apps.volunteer_army.services.admin.issue_event_participation_certificate import create_event_certificate_recognition
from apps.volunteer_army.utils.celery_task.generate_certificate_task import generate_certificate_task

@shared_task(bind=True, autoretry_for=(Exception,), retry_backoff=True, max_retries=3)
def maybe_generate_event_certificate_task(self, participation_id, by_id):
    recognition_id = create_event_certificate_recognition(
        participation_id=participation_id,
        by_id=by_id
    )

    if not recognition_id:
        return


    generate_certificate_task.delay(recognition_id)