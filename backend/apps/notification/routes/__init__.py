from django.urls import path
from apps.notification.views.notification_list_view import NotificationListView
from apps.notification.views.notification_nnread_count_view import NotificationUnreadCountView
from apps.notification.views.notification_mark_all_read_view import NotificationMarkAllReadView
from apps.notification.views.mark_read_bulk_view import NotificationMarkReadBulkView 

urlpatterns = [
    path('list/',NotificationListView.as_view(),name='notification'),
    path("unread-count/", NotificationUnreadCountView.as_view(), name="unread-count"),
    path("mark-all-read/", NotificationMarkAllReadView.as_view(), name="mark-all-read"),
    path("mark-read-bulk/", NotificationMarkReadBulkView.as_view(), name="mark-read-bulk"),
]