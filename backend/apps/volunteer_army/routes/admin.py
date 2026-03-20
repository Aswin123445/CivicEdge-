from django.urls import path

from apps.volunteer_army.views.admin.volunteer_group_create_views import AdminVolunteerGroupCreateView
from apps.volunteer_army.views.admin.volunteer_group_update_view import AdminVolunteerGroupUpdateView
from apps.volunteer_army.views.admin.volunteer_group_activate_view import AdminVolunteerGroupActivateView
from apps.volunteer_army.views.admin.volunteer_group_archive import AdminVolunteerGroupArchiveView
from apps.volunteer_army.views.admin.admin_volunteer_group_list_view import AdminVolunteerGroupListView
from apps.volunteer_army.views.admin.admin_pending_volunteer_membership_list_view import AdminPendingVolunteerMembershipListView
from apps.volunteer_army.views.admin.admin_volunteer_membership_detail_view import AdminVolunteerMembershipDetailView
from apps.volunteer_army.views.admin.admin_volunteer_membership_approve_view import AdminVolunteerMembershipApproveView
from apps.volunteer_army.views.admin.admin_volunteer_membership_reject_view import AdminVolunteerMembershipRejectView
from apps.volunteer_army.views.admin.admin_volunteer_membership_remove_view import AdminVolunteerMembershipRemoveView
from apps.volunteer_army.views.admin.admin_volunteer_event_create_view import AdminVolunteerEventCreateView
from apps.volunteer_army.views.admin.admin_volunteer_event_list_view import AdminVolunteerEventListView
from apps.volunteer_army.views.admin.admin_volunteer_event_detail_view import AdminVolunteerEventDetailView
from apps.volunteer_army.views.admin.admin_volunteer_event_update_view import AdminVolunteerEventUpdateView
from apps.volunteer_army.views.admin.admin_volunteer_event_publish_view import AdminVolunteerEventPublishView
from apps.volunteer_army.views.admin.admin_volunteer_event_cancel_view import AdminVolunteerEventCancelView
from apps.volunteer_army.views.admin.admin_event_participant_list_view import AdminEventParticipantListView
from apps.volunteer_army.views.admin.admin_event_participation_detail_view import AdminEventParticipationDetailView
from apps.volunteer_army.views.admin.AdminEventParticipationMarkNoShowView import AdminEventParticipationMarkNoShowView
from apps.volunteer_army.views.admin.admin_pending_attendance_list_view import AdminPendingAttendanceListView
from apps.volunteer_army.views.admin.admin_attendance_submission_detail_view import AdminAttendanceSubmissionDetailView
from apps.volunteer_army.views.admin.admin_attendance_approve_view import AdminAttendanceApproveView
from apps.volunteer_army.views.admin.admin_attendance_reject_view import AdminAttendanceRejectView
from apps.volunteer_army.views.admin.admin_volunteer_recognition_list_view import AdminVolunteerRecognitionListView
from apps.volunteer_army.views.admin.admin_volunteer_recognition_detail_view import AdminVolunteerRecognitionDetailView
from apps.volunteer_army.views.admin.admin_volunteer_group_detail_view import AdminVolunteerGroupDetailView
from apps.volunteer_army.views.admin.admin_volunteer_service_log_create_view import AdminVolunteerServiceLogCreateView
from apps.volunteer_army.views.admin.admin_service_hours_analytics_view import AdminServiceHoursAnalyticsView
from apps.volunteer_army.views.admin.admin_top_volunteers_view import AdminTopVolunteersView 

urlpatterns = [
    path("volunteer/groups/",AdminVolunteerGroupCreateView.as_view(),name="admin-volunteer-group-create"), 
    path("volunteer/groups/<uuid:group_id>/",AdminVolunteerGroupUpdateView.as_view(),name="admin-volunteer-group-update"),
    path("volunteer/groups/<uuid:group_id>/activate/",AdminVolunteerGroupActivateView.as_view(),name="admin-volunteer-group-activate"),
    path("volunteer/groups/<uuid:group_id>/archive/",AdminVolunteerGroupArchiveView.as_view(),name="admin-volunteer-group-archive"),
    path("volunteer/groups-list/",AdminVolunteerGroupListView.as_view(),name="admin-volunteer-group-list"),
    path("volunteer/groups/<uuid:group_id>/details/",AdminVolunteerGroupDetailView.as_view(),name="admin-volunteer-group-detail"),
    path("volunteer/memberships/pending/",AdminPendingVolunteerMembershipListView.as_view(),name="admin-pending-volunteer-membership-list"),
    path("volunteer/memberships/<uuid:membership_id>/",AdminVolunteerMembershipDetailView.as_view(),name="admin-volunteer-membership-detail"),
    path("volunteer/memberships/<uuid:membership_id>/approve/",AdminVolunteerMembershipApproveView.as_view(),name="admin-volunteer-membership-approve"),
    path("volunteer/memberships/<uuid:membership_id>/reject/",AdminVolunteerMembershipRejectView.as_view(),name="admin-volunteer-membership-reject"),
    path("volunteer/memberships/<uuid:membership_id>/remove/",AdminVolunteerMembershipRemoveView.as_view(),name="admin-volunteer-membership-remove"),
    path("volunteer/events-create/",AdminVolunteerEventCreateView.as_view(),name="admin-volunteer-event-create"),
    path("volunteer/events-list/",AdminVolunteerEventListView.as_view(),name="admin-volunteer-event-list"),
    path("volunteer/events/<uuid:event_id>/details/",AdminVolunteerEventDetailView.as_view(),name="admin-volunteer-event-detail"),
    path("volunteer/events/<uuid:event_id>/update/",AdminVolunteerEventUpdateView.as_view(),name="admin-volunteer-event-update"),
    path("volunteer/events/<uuid:event_id>/publish/",AdminVolunteerEventPublishView.as_view(),name="admin-volunteer-event-publish"),
    path("volunteer/events/<uuid:event_id>/cancel/",AdminVolunteerEventCancelView.as_view(),name="admin-volunteer-event-cancel"),
    path("volunteer/events/<uuid:event_id>/participants/",AdminEventParticipantListView.as_view(),name="admin-volunteer-event-participants"),
    path("volunteer/participations/<uuid:participation_id>/details/",AdminEventParticipationDetailView.as_view(),name="admin-volunteer-participation-detail"),
    path("volunteer/participations/<uuid:participation_id>/mark-no-show/",AdminEventParticipationMarkNoShowView.as_view(),name="admin-volunteer-participation-mark-no-show"),
    path("volunteer/attendance/pending/",AdminPendingAttendanceListView.as_view(),name="admin-pending-attendance-list"),
    path("volunteer/attendance/<uuid:attendance_id>/",AdminAttendanceSubmissionDetailView.as_view(),name="admin-attendance-submission-detail"),
    path("volunteer/attendance/<uuid:attendance_id>/approve/",AdminAttendanceApproveView.as_view(),name="admin-attendance-approve"),
    path("volunteer/attendance/<uuid:attendance_id>/reject/",AdminAttendanceRejectView.as_view(),name="admin-attendance-reject"),
    path("volunteer/recognitions/",AdminVolunteerRecognitionListView.as_view(),name="admin-volunteer-recognitions"),
    path("volunteer/recognitions/<uuid:recognition_id>/",AdminVolunteerRecognitionDetailView.as_view(),name="admin-volunteer-recognition-detail"),
    path("volunteer/analytics/service-hours/",AdminServiceHoursAnalyticsView.as_view(),name="admin-service-hours-analytics"),
    path("volunteer/analytics/top-volunteers/",AdminTopVolunteersView.as_view(),name="admin-top-volunteers"),
]   