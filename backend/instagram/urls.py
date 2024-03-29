from django.urls import include, path
from rest_framework.routers import DefaultRouter

from instagram import views

router = DefaultRouter()
router.register("posts", views.PostViewSet)
router.register(r"posts/(?P<post_pk>\d+)/comments", views.CommentViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
]
