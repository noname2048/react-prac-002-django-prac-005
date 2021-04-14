from django.urls import include, path
from rest_framework.routers import DefaultRouter

from instagram import views

router = DefaultRouter()
router.register(r"posts", views.PostViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
