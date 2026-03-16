from apps.profiles.views.home.me_home_view import MeHomeView 
from django.urls import path
from apps.profiles.views.profile.profile_view import ProfileView
from apps.profiles.views.solver.solver_availability_view import ToggleAvailabilityView
from apps.profiles.views.profile.my_avatar_uipload_view import MyAvatarUploadView
from apps.profiles.views.profile.profile_completion_view import ProfileCompletionView
from apps.profiles.views.home.solver_dashboard_view import SolverDashboardView

urlpatterns = [
    path('home/',MeHomeView.as_view(),name='me-home'),
    path('profile/',ProfileView.as_view(),name='profile'),
    path('work/toggle/',ToggleAvailabilityView.as_view(),name='toggle-availability'),
    path('profile/avatar/',MyAvatarUploadView.as_view(),name='avatar-upload'),
    path('profile/completion/',ProfileCompletionView.as_view(),name='profile-completion'),
    path('solver/dashboard/',SolverDashboardView.as_view(),name='solver-dashboard'),
]