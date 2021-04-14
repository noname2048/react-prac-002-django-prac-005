from django.urls import include, path
from accounts import views

urlpatterns = [
    path("signup/", views.SignupView.as_view(), name="signup/"),
]
