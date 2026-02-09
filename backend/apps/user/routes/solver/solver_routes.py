from django.urls import path  
from apps.user.views.solver.login_view import SolverLoginView  
urlpatterns = [
    path("login/", SolverLoginView.as_view(), name="solver-login"), 
]