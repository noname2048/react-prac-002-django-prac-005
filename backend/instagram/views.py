from datetime import timedelta
from django.db.models import Q
from django.shortcuts import render
from django.utils import timezone
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet

from instagram.models import Post
from instagram.serializers import PostSerializer


class PostViewSet(ModelViewSet):
    queryset = (
        Post.objects.all()
        .select_related("user")
        .prefetch_related("tag_set", "like_user_set")
    )
    serializer_class = PostSerializer
    # permission_classes = [AllowAny]  # FIXME: 인증 적용

    def get_queryset(self):

        qs = super().get_queryset()

        # timesince = timezone.now() - timedelta(days=3)
        # qs = qs.filter(created_at__gte=timesince)

        qs = qs.filter(
            Q(user=self.request.user)
            | Q(user__in=self.request.user.following_set.all())
        )

        return qs
