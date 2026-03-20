from django.urls import path

from apps.volunteer_army.views.citizen.volunteer_group_views import VolunteerGroupDetailView, VolunteerGroupListView
from apps.volunteer_army.views.citizen.volunteer_membership_views import VolunteerGroupJoinView
from apps.volunteer_army.views.citizen.my_volunteer_membership_list_view import MyVolunteerMembershipListView
from apps.volunteer_army.views.citizen.volunteer_membership_detail_view import VolunteerMembershipDetailView
from apps.volunteer_army.views.citizen.volunteer_membership_leave_view import VolunteerMembershipLeaveView
from apps.volunteer_army.views.citizen.membership_evidence_upload_view import MembershipEvidenceUploadView
from apps.volunteer_army.views.citizen.membership_evidence_list_view import MembershipEvidenceListView
from apps.volunteer_army.views.citizen.membership_evidence_delete_view import MembershipEvidenceDeleteView
from apps.volunteer_army.views.citizen.volunteer_membership_submit_view import VolunteerMembershipSubmitView
from apps.volunteer_army.views.citizen.citizen_volunteer_event_list_view import CitizenVolunteerEventListView
from apps.volunteer_army.views.citizen.citizen_volunteer_event_detail_view import CitizenVolunteerEventDetailView
from apps.volunteer_army.views.citizen.citizen_volunteer_eventJoin_view import CitizenVolunteerEventJoinView
from apps.volunteer_army.views.citizen.citizen_volunteer_participation_leave_view import CitizenVolunteerParticipationLeaveView
from apps.volunteer_army.views.citizen.citizen_my_event_participation_list_view import CitizenMyEventParticipationListView
from apps.volunteer_army.views.citizen.citizen_event_participation_detail_view import CitizenEventParticipationDetailView
from apps.volunteer_army.views.citizen.citizen_submit_event_attendance_view import CitizenSubmitEventAttendanceView
from apps.volunteer_army.views.citizen.citizen_participation_attendance_detail_view import CitizenParticipationAttendanceDetailView
from apps.volunteer_army.views.citizen.citizen_volunteer_recognition_list_view import CitizenVolunteerRecognitionListView
from apps.volunteer_army.views.citizen.citizen_volunteer_recognition_detail_view import CitizenVolunteerRecognitionDetailView

urlpatterns = [
    path('volunteer/groups/',VolunteerGroupListView.as_view(),name='volunteer-groups'),
    path('volunteer/groups/<uuid:group_id>/',VolunteerGroupDetailView.as_view(),name='volunteer-group-detail'),
    path('volunteer/groups/<uuid:group_id>/join/',VolunteerGroupJoinView.as_view(),name='volunteer-group-join'),
    path('volunteer/my-memberships/',MyVolunteerMembershipListView.as_view(),name='my-volunteer-memberships'),
    path('volunteer/memberships/<uuid:membership_id>/',VolunteerMembershipDetailView.as_view(),name='volunteer-membership-detail'),
    path('volunteer/memberships/<uuid:membership_id>/leave/',VolunteerMembershipLeaveView.as_view(),name='volunteer-membership-leave'),
    path('volunteer/memberships/<uuid:membership_id>/evidences/',MembershipEvidenceUploadView.as_view(),name='volunteer-membership-evidences'),
    path('volunteer/memberships/<uuid:membership_id>/evidences/list/',MembershipEvidenceListView.as_view(),name='volunteer-membership-evidences-list'),
    path('volunteer/evidences/<uuid:evidence_id>/delete/',MembershipEvidenceDeleteView.as_view(),name='volunteer-evidence-delete'),
    path('volunteer/memberships/<uuid:membership_id>/submit/',VolunteerMembershipSubmitView.as_view(),name='volunteer-membership-submit'),
    path('volunteer/events-list/',CitizenVolunteerEventListView.as_view(),name='volunteer-event-list'),
    path('volunteer/events/<uuid:event_id>/details/',CitizenVolunteerEventDetailView.as_view(),name='volunteer-event-detail'),
    path('volunteer/events/<uuid:event_id>/join/',CitizenVolunteerEventJoinView.as_view(),name='volunteer-event-join'),
    path('volunteer/participations/<uuid:participation_id>/leave/',CitizenVolunteerParticipationLeaveView.as_view(),name='volunteer-participation-leave'),
    path('volunteer/my-participations/',CitizenMyEventParticipationListView.as_view(),name='my-volunteer-participations'),
    path('volunteer/participations/<uuid:participation_id>/details/',CitizenEventParticipationDetailView.as_view(),name='volunteer-participation-detail'),
    path('volunteer/participations/<uuid:participation_id>/submit-attendance/',CitizenSubmitEventAttendanceView.as_view(),name='submit-event-attendance'),
    path('volunteer/participations/<uuid:participation_id>/attendance/',CitizenParticipationAttendanceDetailView.as_view(),name='volunteer-participation-attendance'),
    path('volunteer/my-recognitions/',CitizenVolunteerRecognitionListView.as_view(),name='my-volunteer-recognitions'),
    path('volunteer/recognitions/<uuid:recognition_id>/',CitizenVolunteerRecognitionDetailView.as_view(),name='volunteer-recognition-detail'),
]